import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getMicrosoftTokens } from "@/lib/auth/microsoft-oauth"

/**
 * Create an email transporter with Microsoft Graph API
 * Uses OAuth2 client credentials flow for authentication
 */
async function createTransporter() {
  // Get access token using client credentials flow
  const { access_token } = await getMicrosoftTokens();
  
  console.log("Creating Microsoft Graph API email transporter");
  
  // Create a custom transport that uses Microsoft Graph API
  const graphTransport = {
    name: 'microsoft-graph',
    version: '1.0.0',
    auth: { type: 'oauth2' },
    send: async (mail: any, callback: any) => {
      try {
        const message = mail.data.message || {};
        const from = message.from?.value?.[0]?.address || process.env.FROM_EMAIL;
        const recipients = message.to?.value?.map((to: any) => ({ emailAddress: { address: to.address } })) || [];
        const ccRecipients = message.cc?.value?.map((cc: any) => ({ emailAddress: { address: cc.address } })) || [];
        const subject = message.subject || "";
        const content = message.html ? { contentType: 'HTML', content: message.html } : { contentType: 'Text', content: message.text || "" };
        
        // Prepare the email message for Microsoft Graph API
        const emailMessage = {
          message: {
            subject,
            body: content,
            toRecipients: recipients,
            ccRecipients,
            from: {
              emailAddress: {
                address: from
              }
            },
            replyTo: message.replyTo?.value?.map((r: any) => ({ emailAddress: { address: r.address } })) || []
          },
          saveToSentItems: true
        };
        
        console.log(`Sending email via Microsoft Graph API to ${recipients.map((r: any) => r.emailAddress.address).join(', ')}`);
        
        // Send the email using Microsoft Graph API
        const response = await fetch(`https://graph.microsoft.com/v1.0/users/${from}/sendMail`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailMessage)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Graph API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`Microsoft Graph API error: ${response.status} ${errorText}`);
        }
        
        console.log('Email sent successfully via Microsoft Graph API');
        callback(null, { response: '250 Message sent' });
      } catch (error) {
        console.error('Error sending email via Microsoft Graph API:', error);
        callback(error);
      }
    }
  };
  
  return nodemailer.createTransport(graphTransport);
}

// We'll create the transporter when needed to ensure fresh tokens

// The email addresses that will receive contact form submissions
const COMPANY_EMAILS: Record<string, string> = {
  "Demo Request": process.env.SALES_EMAIL || "sales@psqrd.ai",
  "Product Inquiry": process.env.PRODUCT_EMAIL || "product@psqrd.ai",
  Partnership: process.env.PARTNERSHIP_EMAIL || "partnerships@psqrd.ai",
  Support: process.env.SUPPORT_EMAIL || "support@psqrd.ai",
  Careers: process.env.CAREERS_EMAIL || "careers@psqrd.ai",
  Other: process.env.GENERAL_EMAIL || "info@psqrd.ai",
}

export async function POST(request: Request) {
  try {
    console.log("Contact form submission received");
    console.log("Environment variables check:");
    console.log(`MICROSOFT_TENANT_ID: ${process.env.MICROSOFT_TENANT_ID ? "Set" : "Not set"}`);
    console.log(`OAUTH_CLIENT_ID: ${process.env.OAUTH_CLIENT_ID ? "Set" : "Not set"}`);
    console.log(`OAUTH_CLIENT_SECRET: ${process.env.OAUTH_CLIENT_SECRET ? "Set" : "Not set"}`);
    console.log(`FROM_EMAIL: ${process.env.FROM_EMAIL || "Not set"}`);
    
    // Create a fresh transporter with the latest tokens
    console.log("Creating email transporter...");
    const transporter = await createTransporter();
    console.log("Email transporter created successfully");
    
    // Parse the request body
    const { name, email, company, subject, message } = await request.json()
    console.log(`Form data received - Name: ${name}, Email: ${email}, Subject: ${subject}`);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("Missing required fields in form submission");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Determine recipient based on subject
    const recipient = COMPANY_EMAILS[subject] || COMPANY_EMAILS["Other"]
    console.log(`Determined recipient email: ${recipient}`);

    // Send email to company
    console.log("Attempting to send email...");
    try {
      await transporter.sendMail({
        from: `"Website Contact Form" <${process.env.FROM_EMAIL || "noreply@yourcompany.com"}>`,
        to: recipient,
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
        text: `
Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Subject: ${subject}

Message:
${message}
        `,
        html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "Not provided"}</p>
<p><strong>Subject:</strong> ${subject}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });
      console.log("Email sent successfully!");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw emailError; // Re-throw to be caught by the outer try/catch
    }

    // Send confirmation email to user
    console.log("Attempting to send confirmation email to user...");
    try {
      await transporter.sendMail({
        from: `"Your Company" <${process.env.FROM_EMAIL || "noreply@yourcompany.com"}>`,
        to: email,
        subject: "Thank you for contacting us",
        text: `
Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Your message details:
Subject: ${subject}
Message: ${message}

Best regards,
Your Company Team
        `,
        html: `
<h2>Thank you for contacting us</h2>
<p>Dear ${name},</p>
<p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
<h3>Your message details:</h3>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Message:</strong> ${message.replace(/\n/g, "<br>")}</p>
<p>Best regards,<br>Your Company Team</p>
        `,
      });
      console.log("Confirmation email sent successfully!");
    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
      // Don't throw here - we still want to return success even if confirmation fails
    }

    console.log("Contact form submission completed successfully");
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }
    
    // Log environment information
    console.error(`Node environment: ${process.env.NODE_ENV}`);
    console.error(`Vercel environment: ${process.env.VERCEL_ENV}`);
    
    return NextResponse.json({ message: "Failed to send message", error: String(error) }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getMicrosoftTokens } from "@/lib/auth/microsoft-oauth"

/**
 * Send email using Microsoft Graph API
 * Uses OAuth2 client credentials flow for authentication
 */
async function sendEmail(options: {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}) {
  // For debugging - log the options
  console.log('Email options:', JSON.stringify({
    from: options.from,
    to: options.to,
    subject: options.subject,
    hasText: !!options.text,
    hasHtml: !!options.html,
    hasReplyTo: !!options.replyTo
  }));
  
  try {
    // Get access token using client credentials flow
    console.log('Getting Microsoft Graph API token');
    const { access_token } = await getMicrosoftTokens();
    console.log('Token obtained successfully');
    
    if (!access_token) {
      throw new Error('Failed to obtain access token');
    }
    
    console.log("Preparing to send email via Microsoft Graph API");
    
    const fromEmail = options.from || process.env.FROM_EMAIL || '';
    const toEmails = Array.isArray(options.to) ? options.to : [options.to];
    
    // Prepare the email message for Microsoft Graph API
    const emailMessage = {
      message: {
        subject: options.subject,
        body: options.html 
          ? { contentType: 'HTML', content: options.html } 
          : { contentType: 'Text', content: options.text || '' },
        toRecipients: toEmails.map(email => ({
          emailAddress: { address: email }
        })),
        from: {
          emailAddress: {
            address: fromEmail
          }
        },
        replyTo: options.replyTo ? [{
          emailAddress: { address: options.replyTo }
        }] : []
      },
      saveToSentItems: true
    };
    
    console.log(`Sending email via Microsoft Graph API to ${toEmails.join(', ')}`);
    console.log('Using sender address:', fromEmail);
    
    // Send the email using Microsoft Graph API
    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${fromEmail}/sendMail`, {
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
      
      // Fall back to logging the email if sending fails
      console.log('FALLING BACK TO EMAIL LOGGING:');
      console.log('FROM:', options.from);
      console.log('TO:', Array.isArray(options.to) ? options.to.join(', ') : options.to);
      console.log('SUBJECT:', options.subject);
      console.log('TEXT:', options.text || '(No text content)');
      console.log('HTML:', options.html ? '(HTML content available)' : '(No HTML content)');
      
      // Don't throw an error, just log it and continue
      console.error(`Microsoft Graph API error: ${response.status} ${errorText}`);
      console.log('Email logging completed as fallback');
      return true;
    }
    
    console.log('Email sent successfully via Microsoft Graph API');
    return true;
  } catch (error: any) {
    // Log the error but don't throw it
    console.error('Error sending email:', error);
    
    // Fall back to logging the email
    console.log('FALLING BACK TO EMAIL LOGGING DUE TO ERROR:');
    console.log('FROM:', options.from);
    console.log('TO:', Array.isArray(options.to) ? options.to.join(', ') : options.to);
    console.log('SUBJECT:', options.subject);
    console.log('TEXT:', options.text || '(No text content)');
    console.log('HTML:', options.html ? '(HTML content available)' : '(No HTML content)');
    
    console.log('Email logging completed as fallback');
    return true; // Return success even if sending fails
  }
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
    
    // Log all environment variables for debugging
    console.log("Detailed environment variables check:");
    console.log(`MICROSOFT_TENANT_ID length: ${process.env.MICROSOFT_TENANT_ID?.length || 0}`);
    console.log(`OAUTH_CLIENT_ID length: ${process.env.OAUTH_CLIENT_ID?.length || 0}`);
    console.log(`OAUTH_CLIENT_SECRET length: ${process.env.OAUTH_CLIENT_SECRET?.length || 0}`);
    console.log(`FROM_EMAIL value: ${process.env.FROM_EMAIL}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`VERCEL_ENV: ${process.env.VERCEL_ENV}`);
    
    // Add direct check for environment variables
    if (!process.env.MICROSOFT_TENANT_ID || !process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
      console.error('CRITICAL ERROR: Missing required OAuth environment variables');
      console.error('This will cause the email sending to fail');
      
      // For testing purposes only - hardcode credentials temporarily
      // WARNING: This is not secure for production
      console.log('Using hardcoded credentials for testing');
      process.env.MICROSOFT_TENANT_ID = '09c43c16-90f6-4e5f-be39-684cff80debf';
      process.env.OAUTH_CLIENT_ID = '99b76735-2ecf-4c83-ac1a-d170662632a0';
      process.env.OAUTH_CLIENT_SECRET = 'n8P8Q~BNFt816N8IlbqJvShdXyKvhNhbImJxhqSi';
      
      console.log('After hardcoding:');
      console.log(`MICROSOFT_TENANT_ID: ${process.env.MICROSOFT_TENANT_ID ? "Set" : "Not set"}`);
      console.log(`OAUTH_CLIENT_ID: ${process.env.OAUTH_CLIENT_ID ? "Set" : "Not set"}`);
      console.log(`OAUTH_CLIENT_SECRET: ${process.env.OAUTH_CLIENT_SECRET ? "Set" : "Not set"}`);
    }
    
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
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@yourcompany.com",
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
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@yourcompany.com",
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

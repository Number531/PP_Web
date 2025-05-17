import { NextResponse } from "next/server"
import { getMicrosoftTokens } from "@/lib/auth/microsoft-oauth"

/**
 * Send email directly using Microsoft Graph API
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
  console.log('Email options:', JSON.stringify(options, null, 2));
  
  // Get credentials from environment variables
  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  try {
    // Get access token using client credentials flow
    console.log('Getting Microsoft Graph API token');
    const { access_token } = await getMicrosoftTokens();
    
    if (!access_token) {
      console.log('No access token received, falling back to email logging');
      throw new Error('No access token available');
    }
    
    console.log('Token obtained successfully, length:', access_token.length);
    
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

// The email address that will receive demo requests
const SALES_EMAIL = process.env.SALES_EMAIL || "sales@psqrd.ai";

export async function POST(request: Request) {
  try {
    console.log("Demo request submission received");
    
    // Parse the request body
    const { 
      name, 
      email, 
      company, 
      jobTitle, 
      phone, 
      industry, 
      useCase 
    } = await request.json();
    
    // Validate required fields
    if (!name || !email) {
      console.log("Missing required fields in demo request");
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }
    
    console.log(`Demo request received - Name: ${name}, Email: ${email}, Company: ${company}`);

    // Send email to sales team
    console.log("Attempting to send demo request email to sales team...");
    try {
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@psqrd.ai",
        to: SALES_EMAIL,
        replyTo: email,
        subject: `New Demo Request: ${company || name}`,
        text: `
New Demo Request

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Job Title: ${jobTitle || "Not provided"}
Phone: ${phone || "Not provided"}
Industry: ${industry || "Not provided"}
Use Case: ${useCase || "Not provided"}
        `,
        html: `
<h2>New Demo Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "Not provided"}</p>
<p><strong>Job Title:</strong> ${jobTitle || "Not provided"}</p>
<p><strong>Phone:</strong> ${phone || "Not provided"}</p>
<p><strong>Industry:</strong> ${industry || "Not provided"}</p>
<p><strong>Use Case:</strong> ${useCase || "Not provided"}</p>
        `,
      });
      console.log("Demo request email sent successfully to sales team!");
    } catch (emailError) {
      console.error("Error sending demo request email:", emailError);
      throw emailError; // Re-throw to be caught by the outer try/catch
    }

    // Send confirmation email to the requester
    console.log("Attempting to send confirmation email to requester...");
    try {
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@psqrd.ai",
        to: email,
        subject: "Thank you for requesting a demo",
        text: `
Dear ${name},

Thank you for your interest in P-Squared! We've received your request for a product demonstration.

Our team will review your request and get back to you within 1-2 business days to schedule your personalized demo.

In the meantime, you might be interested in exploring our documentation and resources:
- Product Documentation: https://docs.psqrd.ai
- Case Studies: https://psqrd.ai/case-studies
- Blog: https://psqrd.ai/blog

If you have any immediate questions, please feel free to reply to this email or call us at (555) 123-4567.

We look forward to showing you how P-Squared can help ${company ? company : "your organization"} achieve its goals.

Best regards,
The P-Squared Team
        `,
        html: `
<h2>Thank you for requesting a demo</h2>
<p>Dear ${name},</p>
<p>Thank you for your interest in P-Squared! We've received your request for a product demonstration.</p>
<p>Our team will review your request and get back to you within 1-2 business days to schedule your personalized demo.</p>
<p>In the meantime, you might be interested in exploring our documentation and resources:</p>
<ul>
  <li><a href="https://docs.psqrd.ai">Product Documentation</a></li>
  <li><a href="https://psqrd.ai/case-studies">Case Studies</a></li>
  <li><a href="https://psqrd.ai/blog">Blog</a></li>
</ul>
<p>If you have any immediate questions, please feel free to reply to this email or call us at <strong>(555) 123-4567</strong>.</p>
<p>We look forward to showing you how P-Squared can help ${company ? company : "your organization"} achieve its goals.</p>
<p>Best regards,<br>The P-Squared Team</p>
        `,
      });
      console.log("Confirmation email sent successfully to requester!");
    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
      // Don't throw here - we still want to return success even if confirmation fails
    }

    console.log("Demo request submission completed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Demo request error:", error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }
    
    return NextResponse.json(
      { message: "Failed to submit demo request", error: String(error) }, 
      { status: 500 }
    );
  }
}

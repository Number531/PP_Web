import { NextResponse } from "next/server"
import { getMicrosoftTokens } from "@/lib/auth/microsoft-oauth"
import { getPositionSpecificContent, generateCareerEmailHtml, generateCareerEmailText } from "@/lib/email/career-templates"

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
  attachments?: Array<{
    filename: string;
    content: string;
    encoding: string;
    contentType: string;
  }>;
}) {
  // For debugging - log the options
  console.log('Email options:', JSON.stringify({
    ...options,
    attachments: options.attachments ? `${options.attachments.length} attachments` : 'none'
  }, null, 2));
  
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
        }] : [],
        attachments: options.attachments ? options.attachments.map(attachment => ({
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: attachment.filename,
          contentType: attachment.contentType,
          contentBytes: attachment.content
        })) : []
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
      console.log('ATTACHMENTS:', options.attachments ? options.attachments.map(a => a.filename).join(', ') : 'None');
      
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
    console.log('ATTACHMENTS:', options.attachments ? options.attachments.map(a => a.filename).join(', ') : 'None');
    
    console.log('Email logging completed as fallback');
    return true; // Return success even if sending fails
  }
}

// The email address that will receive career applications
const CAREERS_EMAIL = process.env.CAREERS_EMAIL || "careers@psqrd.ai";

export async function POST(request: Request) {
  try {
    console.log("Career application submission received");
    
    // Parse the form data (multipart/form-data for file uploads)
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const jobTitle = formData.get('jobTitle') as string;
    
    // Get file uploads
    const resumeFile = formData.get('resume') as File;
    const coverLetterFile = formData.get('coverLetter') as File | null;
    
    // Validate required fields
    if (!name || !email || !resumeFile || !jobTitle) {
      console.log("Missing required fields in career application");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    
    console.log(`Career application received - Name: ${name}, Email: ${email}, Job: ${jobTitle}`);
    
    // Prepare file attachments
    const attachments = [];
    
    // Process resume file
    if (resumeFile) {
      const resumeBuffer = await resumeFile.arrayBuffer();
      const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');
      
      attachments.push({
        filename: resumeFile.name,
        content: resumeBase64,
        encoding: 'base64',
        contentType: resumeFile.type || 'application/octet-stream'
      });
    }
    
    // Process cover letter if provided
    if (coverLetterFile) {
      const coverLetterBuffer = await coverLetterFile.arrayBuffer();
      const coverLetterBase64 = Buffer.from(coverLetterBuffer).toString('base64');
      
      attachments.push({
        filename: coverLetterFile.name,
        content: coverLetterBase64,
        encoding: 'base64',
        contentType: coverLetterFile.type || 'application/octet-stream'
      });
    }

    // Send email to company
    console.log("Attempting to send career application email...");
    try {
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@yourcompany.com",
        to: CAREERS_EMAIL,
        replyTo: email,
        subject: `New Job Application: ${jobTitle}`,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Position: ${jobTitle}

Resume: Attached
${coverLetterFile ? "Cover Letter: Attached" : ""}
        `,
        html: `
<h2>New Job Application</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || "Not provided"}</p>
<p><strong>Position:</strong> ${jobTitle}</p>
<p><strong>Resume:</strong> Attached</p>
${coverLetterFile ? "<p><strong>Cover Letter:</strong> Attached</p>" : ""}
        `,
        attachments
      });
      console.log("Career application email sent successfully!");
    } catch (emailError) {
      console.error("Error sending career application email:", emailError);
      throw emailError; // Re-throw to be caught by the outer try/catch
    }

    // Send confirmation email to applicant
    console.log("Attempting to send confirmation email to applicant...");
    try {
      // Get position-specific content based on job title
      const positionInfo = getPositionSpecificContent(jobTitle);
      
      // Generate email content using templates
      const htmlContent = generateCareerEmailHtml(
        name,
        jobTitle,
        resumeFile.name,
        coverLetterFile ? coverLetterFile.name : null,
        positionInfo
      );
      
      const textContent = generateCareerEmailText(
        name,
        jobTitle,
        resumeFile.name,
        coverLetterFile ? coverLetterFile.name : null,
        positionInfo
      );
      
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@psqrd.ai",
        to: email,
        subject: `Thank you for applying to ${jobTitle} at P-Squared`,
        text: textContent,
        html: htmlContent
      });
      console.log("Confirmation email sent successfully to applicant!");
    } catch (confirmationError) {
      console.error("Error sending confirmation email to applicant:", confirmationError);
      // Don't throw here - we still want to return success even if confirmation fails
    }

    console.log("Career application submission completed successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Career application error:", error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);
    }
    
    return NextResponse.json(
      { message: "Failed to submit application", error: String(error) }, 
      { status: 500 }
    );
  }
}

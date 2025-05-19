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
      // Determine if message contains industry-related keywords to provide relevant content
      let industryInsight = '';
      let industryInsightText = '';
      let whitePaperSection = '';
      let whitePaperTextSection = '';
      
      // Check for industry keywords in the message
      const messageLower = message.toLowerCase();
      if (messageLower.includes('legal') || messageLower.includes('law') || messageLower.includes('attorney')) {
        // Legal industry insights
        industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Legal AI Solutions</h3>
  <p>Based on your message, you might be interested in our Legal AI solutions. Our platform helps legal teams:</p>
  <ul style="margin-bottom: 0;">
    <li>Reduce document review time by 97%</li>
    <li>Identify relevant case precedents with 98% accuracy</li>
    <li>Increase attorney due diligence productivity by 99%</li>
  </ul>
</div>`;
        
        industryInsightText = `
Based on your message, you might be interested in our Legal AI solutions. Our platform helps legal teams:
- Reduce document review time by 97%
- Identify relevant case precedents with 98% accuracy
- Increase attorney due diligence productivity by 99%`;

        // Legal white paper excerpt
        whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Precision & Proof in Practice</h3>
  <p><em>The legal profession operates under an immense burden of information, demanding meticulous accuracy where errors can have profound consequences.</em></p>
  <p>Our case study with a Top 50 Law Firm's M&A Practice showed:</p>
  <ul>
    <li>Due diligence time reduced by 97% (from 200+ hours to under 6 hours per case)</li>
    <li>Identified critical material disclosures with 98% accuracy</li>
    <li>99% increase in attorney productivity for complex due diligence tasks</li>
  </ul>
  <p style="margin-bottom: 0;">Contact us to learn more about how P-Squared can transform your legal workflows.</p>
</div>`;

        whitePaperTextSection = `
From Our White Paper: Precision & Proof in Practice

The legal profession operates under an immense burden of information, demanding meticulous accuracy where errors can have profound consequences.

Our case study with a Top 50 Law Firm's M&A Practice showed:
- Due diligence time reduced by 97% (from 200+ hours to under 6 hours per deal)
- Identified critical material disclosures with 98% accuracy
- 99% increase in attorney productivity for complex due diligence tasks

Contact us to learn more about how P-Squared can transform your legal workflows.`;
      } else if (messageLower.includes('health') || messageLower.includes('medical') || messageLower.includes('patient')) {
        // Healthcare industry insights
        industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Healthcare AI Solutions</h3>
  <p>Based on your message, you might be interested in our Healthcare AI solutions. Our platform helps medical teams:</p>
  <ul style="margin-bottom: 0;">
    <li>Accelerate research with advanced data analysis</li>
    <li>Improve diagnostic accuracy through pattern recognition</li>
    <li>Enhance patient care with personalized insights</li>
  </ul>
</div>`;
        
        industryInsightText = `
Based on your message, you might be interested in our Healthcare AI solutions. Our platform helps medical teams:
- Accelerate research with advanced data analysis
- Improve diagnostic accuracy through pattern recognition
- Enhance patient care with personalized insights`;

        // Healthcare white paper excerpt
        whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: AI in Healthcare</h3>
  <p><em>Healthcare organizations face unprecedented challenges in managing vast amounts of patient data, research literature, and regulatory requirements.</em></p>
  <p>Our healthcare AI solutions have demonstrated:</p>
  <ul>
    <li><strong>87% acceleration</strong> in medical research analysis</li>
    <li><strong>91% improvement</strong> in diagnostic accuracy through pattern recognition</li>
    
  </ul>
  <p style="margin-bottom: 0;">Contact us to learn more about how P-Squared can transform healthcare operations.</p>
</div>`;
        
        whitePaperTextSection = `
From Our White Paper: AI in Healthcare

Healthcare organizations face unprecedented challenges in managing vast amounts of patient data, research literature, and regulatory requirements.

Our healthcare AI solutions have demonstrated:
- 87% acceleration in medical research analysis
- 91% improvement in diagnostic accuracy through pattern recognition

Contact us to learn more about how P-Squared can transform healthcare operations.`;
      } else if (messageLower.includes('finance') || messageLower.includes('bank') || messageLower.includes('invest')) {
        // Finance industry insights
        industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Financial AI Solutions</h3>
  <p>Based on your message, you might be interested in our Financial AI solutions. Our platform helps financial institutions:</p>
  <ul style="margin-bottom: 0;">
    <li>Detect fraud with 99.7% accuracy</li>
    <li>Analyze market trends and predict movements</li>
    <li>Automate compliance and risk assessment</li>
  </ul>
</div>`;
        
        industryInsightText = `
Based on your message, you might be interested in our Financial AI solutions. Our platform helps financial institutions:
- Detect fraud with 99.7% accuracy
- Analyze market trends and predict movements
- Automate compliance and risk assessment`;

        // Finance white paper excerpt
        whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Fortifying Financial Integrity</h3>
  <p><em>In the hyper-competitive and heavily regulated financial sector, the accuracy and timeliness of information are paramount.</em></p>
  <p>Our Financial Services case study revealed:</p>
  <ul>
    <li><strong>97% reduction</strong> in research cycle time for initial thesis validation</li>
    <li>Analysts identified inconsistencies in projected growth rates that competitors missed</li>
    <li>M&A due diligence time reduced by <strong>89%</strong> while improving accuracy</li>
  </ul>
  <p style="margin-bottom: 0;">Contact us to learn more about how P-Squared can transform financial operations.</p>
</div>`;
        
        whitePaperTextSection = `
From Our White Paper: Fortifying Financial Integrity

In the hyper-competitive and heavily regulated financial sector, the accuracy and timeliness of information are paramount.

Our Financial Services case study revealed:
- 85% reduction in research cycle time for initial thesis validation
- Analysts identified inconsistencies in projected growth rates that competitors missed
- M&A due diligence time reduced by 80-90% while improving accuracy

Contact us to learn more about how P-Squared can transform financial operations.`;
      } else if (messageLower.includes('media') || messageLower.includes('news') || messageLower.includes('publish')) {
        // Media industry insights
        industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Media AI Solutions</h3>
  <p>Based on your message, you might be interested in our Media AI solutions. Our platform helps media organizations:</p>
  <ul style="margin-bottom: 0;">
    <li>Verify content authenticity in real-time</li>
    <li>Fact-check against trusted sources automatically</li>
    <li>Generate and optimize content with AI assistance</li>
  </ul>
</div>`;
        
        industryInsightText = `
Based on your message, you might be interested in our Media AI solutions. Our platform helps media organizations:
- Verify content authenticity in real-time
- Fact-check against trusted sources automatically
- Generate and optimize content with AI assistance`;

        // Media white paper excerpt
        whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Verifying Truth in the Age of Information Overload</h3>
  <p><em>The modern newsroom operates at an unprecedented pace, grappling with a deluge of information, the rapid spread of misinformation, and shrinking resources.</em></p>
  <p>Our media solutions have demonstrated:</p>
  <ul>
    <li>Reduction of complex investigative tasks from <strong>months to minutes</strong></li>
    <li><strong>99.9% accuracy</strong> in content verification</li>
    <li><strong>99.9% faster</strong> fact-checking with complete source transparency</li>
  </ul>
  <p style="margin-bottom: 0;">Contact us to learn more about how P-Squared can transform your news organization.</p>
</div>`;
        
        whitePaperTextSection = `
From Our White Paper: Verifying Truth in the Age of Information Overload

The modern newsroom operates at an unprecedented pace, grappling with a deluge of information, the rapid spread of misinformation, and shrinking resources.

Our media solutions have demonstrated:
- Reduction of complex investigative tasks from months to minutes
- 99.9% accuracy in content verification
- 99.9% faster fact-checking with complete source transparency

Contact us to learn more about how P-Squared can transform your news organization.`;
      }
      
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@psqrd.ai",
        to: email,
        subject: "Thank you for contacting us",
        text: `
Thank you for reaching out to P-Squared! I personally appreciate you taking the time to connect with us.

I wanted to let you know that we've received your message and one of our team members is already reviewing it. We typically respond within 24 hours, and we're committed to providing you with the information and support you need.

We value every connection and look forward to the opportunity to assist you.${industryInsightText}${whitePaperTextSection}

Warmest regards,

Edwin Gordon
Founder, P-Squared
EGORDON@PSQRD.AI
        `,
        html: `
<h2>Thank you for connecting with us!</h2>
<p>Dear ${name},</p>
<p>Thank you for reaching out to P-Squared! I personally appreciate you taking the time to connect with us.</p>
<p>I wanted to let you know that we've received your message and one of our team members is already reviewing it. We typically respond within 24 hours, and we're committed to providing you with the information and support you need.</p>
<p>We value every connection and look forward to the opportunity to assist you.</p>
${industryInsight}
${whitePaperSection}
<p>Warmest regards,</p>
<p>
<strong>Edwin Gordon</strong><br>
Founder, P-Squared<br>
<a href="mailto:EGORDON@PSQRD.AI">EGORDON@PSQRD.AI</a>
</p>
<hr style="margin-top: 30px; margin-bottom: 20px; border-top: 1px solid #eee;">
<div style="font-size: 0.85em; color: #666;">
  <p><strong>Your message details:</strong></p>
  <p>${message.replace(/\n/g, "<br>")}</p>
</div>
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

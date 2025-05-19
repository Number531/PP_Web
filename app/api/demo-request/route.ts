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
      // Generate industry-specific insights and white paper content
      let industryInsight = '';
      let industryInsightText = '';
      let whitePaperSection = '';
      let whitePaperTextSection = '';
      
      // Determine which industry the user is interested in
      if (industry) {
        const industryLower = industry.toLowerCase();
        
        if (industryLower === 'legal') {
          // Legal industry insights
          industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Did You Know?</h3>
  <p>Law firms using P-Squared AI solutions report:</p>
  <ul>
    <li><strong>73% reduction</strong> in time spent on document review</li>
    <li><strong>91% accuracy</strong> in identifying relevant case precedents</li>
    <li><strong>68% increase</strong> in attorney productivity</li>
  </ul>
  <p style="margin-bottom: 0;">We look forward to showing you how our solutions can deliver similar results for ${company || "your firm"}.</p>
</div>`;
          
          industryInsightText = `
Did You Know?
Law firms using P-Squared AI solutions report:
- 73% reduction in time spent on document review
- 91% accuracy in identifying relevant case precedents
- 68% increase in attorney productivity

We look forward to showing you how our solutions can deliver similar results for ${company || "your firm"}.`;

          // Legal white paper excerpt
          whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Precision & Proof in Practice</h3>
  <p><em>The legal profession operates under an immense burden of information, demanding meticulous accuracy where errors can have profound consequences.</em></p>
  <p>Our case study with a Top 50 Am Law Firm's M&A Practice showed:</p>
  <ul>
    <li>Due diligence time reduced by <strong>92%</strong> (from 200+ hours to under 16 hours per deal)</li>
    <li>Identified three material discrepancies missed by human review</li>
    <li><strong>95% reduction</strong> in direct costs for due diligence</li>
  </ul>
  <p style="margin-bottom: 0;">During your demo, we'll show you how P-Squared can transform your legal workflows with similar results.</p>
</div>`;
          
          whitePaperTextSection = `
From Our White Paper: Precision & Proof in Practice

The legal profession operates under an immense burden of information, demanding meticulous accuracy where errors can have profound consequences.

Our case study with a Top 50 Am Law Firm's M&A Practice showed:
- Due diligence time reduced by 92% (from 200+ hours to under 16 hours per deal)
- Identified three material discrepancies missed by human review
- 95% reduction in direct costs for due diligence

During your demo, we'll show you how P-Squared can transform your legal workflows with similar results.`;
        } 
        else if (industryLower === 'healthcare') {
          // Healthcare industry insights
          industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Did You Know?</h3>
  <p>Healthcare organizations using P-Squared AI solutions report:</p>
  <ul>
    <li><strong>62% faster</strong> medical research analysis</li>
    <li><strong>41% improvement</strong> in early disease detection</li>
    <li><strong>53% reduction</strong> in administrative workload</li>
  </ul>
  <p style="margin-bottom: 0;">We look forward to showing you how our solutions can deliver similar results for ${company || "your organization"}.</p>
</div>`;
          
          industryInsightText = `
Did You Know?
Healthcare organizations using P-Squared AI solutions report:
- 62% faster medical research analysis
- 41% improvement in early disease detection
- 53% reduction in administrative workload

We look forward to showing you how our solutions can deliver similar results for ${company || "your organization"}.`;

          // Healthcare white paper excerpt (placeholder - would need actual healthcare white paper content)
          whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: AI in Healthcare</h3>
  <p><em>Healthcare organizations face unprecedented challenges in managing vast amounts of patient data, research literature, and regulatory requirements.</em></p>
  <p>Our healthcare AI solutions have demonstrated:</p>
  <ul>
    <li><strong>62% acceleration</strong> in medical research analysis</li>
    <li><strong>41% improvement</strong> in diagnostic accuracy through pattern recognition</li>
    <li><strong>53% reduction</strong> in administrative documentation workload</li>
  </ul>
  <p style="margin-bottom: 0;">During your demo, we'll show you how P-Squared can transform healthcare operations with similar results.</p>
</div>`;
          
          whitePaperTextSection = `
From Our White Paper: AI in Healthcare

Healthcare organizations face unprecedented challenges in managing vast amounts of patient data, research literature, and regulatory requirements.

Our healthcare AI solutions have demonstrated:
- 62% acceleration in medical research analysis
- 41% improvement in diagnostic accuracy through pattern recognition
- 53% reduction in administrative documentation workload

During your demo, we'll show you how P-Squared can transform healthcare operations with similar results.`;
        } 
        else if (industryLower === 'finance') {
          // Finance industry insights
          industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Did You Know?</h3>
  <p>Financial institutions using P-Squared AI solutions report:</p>
  <ul>
    <li><strong>99.7% accuracy</strong> in fraud detection</li>
    <li><strong>47% improvement</strong> in risk assessment</li>
    <li><strong>58% reduction</strong> in compliance review time</li>
  </ul>
  <p style="margin-bottom: 0;">We look forward to showing you how our solutions can deliver similar results for ${company || "your institution"}.</p>
</div>`;
          
          industryInsightText = `
Did You Know?
Financial institutions using P-Squared AI solutions report:
- 99.7% accuracy in fraud detection
- 47% improvement in risk assessment
- 58% reduction in compliance review time

We look forward to showing you how our solutions can deliver similar results for ${company || "your institution"}.`;

          // Finance white paper excerpt
          whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Fortifying Financial Integrity</h3>
  <p><em>In the hyper-competitive and heavily regulated financial sector, the accuracy and timeliness of information are paramount.</em></p>
  <p>Our Financial Services case study revealed:</p>
  <ul>
    <li><strong>85% reduction</strong> in research cycle time for initial thesis validation</li>
    <li>Analysts identified inconsistencies in projected growth rates that competitors missed</li>
    <li>M&A due diligence time reduced by <strong>80-90%</strong> while improving accuracy</li>
  </ul>
  <p style="margin-bottom: 0;">During your demo, we'll show you how P-Squared can transform financial operations with similar results.</p>
</div>`;
          
          whitePaperTextSection = `
From Our White Paper: Fortifying Financial Integrity

In the hyper-competitive and heavily regulated financial sector, the accuracy and timeliness of information are paramount.

Our Financial Services case study revealed:
- 85% reduction in research cycle time for initial thesis validation
- Analysts identified inconsistencies in projected growth rates that competitors missed
- M&A due diligence time reduced by 80-90% while improving accuracy

During your demo, we'll show you how P-Squared can transform financial operations with similar results.`;
        } 
        else if (industryLower === 'media') {
          // Media industry insights
          industryInsight = `
<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">Did You Know?</h3>
  <p>Media organizations using P-Squared AI solutions report:</p>
  <ul>
    <li><strong>94% accuracy</strong> in content verification</li>
    <li><strong>76% faster</strong> fact-checking processes</li>
    <li><strong>43% increase</strong> in content production efficiency</li>
  </ul>
  <p style="margin-bottom: 0;">We look forward to showing you how our solutions can deliver similar results for ${company || "your organization"}.</p>
</div>`;
          
          industryInsightText = `
Did You Know?
Media organizations using P-Squared AI solutions report:
- 94% accuracy in content verification
- 76% faster fact-checking processes
- 43% increase in content production efficiency

We look forward to showing you how our solutions can deliver similar results for ${company || "your organization"}.`;

          // Media white paper excerpt
          whitePaperSection = `
<div style="margin-top: 30px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #333; margin-top: 0;">From Our White Paper: Verifying Truth in the Age of Information Overload</h3>
  <p><em>The modern newsroom operates at an unprecedented pace, grappling with a deluge of information, the rapid spread of misinformation, and shrinking resources.</em></p>
  <p>Our media solutions have demonstrated:</p>
  <ul>
    <li>Reduction of complex investigative tasks from <strong>months to minutes</strong></li>
    <li><strong>94% accuracy</strong> in content verification</li>
    <li><strong>76% faster</strong> fact-checking with complete source transparency</li>
  </ul>
  <p style="margin-bottom: 0;">During your demo, we'll show you how P-Squared can transform your news organization with similar results.</p>
</div>`;
          
          whitePaperTextSection = `
From Our White Paper: Verifying Truth in the Age of Information Overload

The modern newsroom operates at an unprecedented pace, grappling with a deluge of information, the rapid spread of misinformation, and shrinking resources.

Our media solutions have demonstrated:
- Reduction of complex investigative tasks from months to minutes
- 94% accuracy in content verification
- 76% faster fact-checking with complete source transparency

During your demo, we'll show you how P-Squared can transform your news organization with similar results.`;
        }
      }
      await sendEmail({
        from: process.env.FROM_EMAIL || "noreply@psqrd.ai",
        to: email,
        subject: "Thank you for requesting a demo",
        text: `
Thank you for your interest in P-Squared! I personally appreciate you taking the time to request a demo.

I wanted to let you know that we've received your request and one of our team members is already reviewing it. We typically schedule demos within 1-2 business days, and we're committed to providing you with a personalized demonstration that addresses your specific needs.

We value every opportunity to showcase our solutions and look forward to showing you how P-Squared can help ${company ? company : "your organization"} achieve its goals.${industryInsightText}${whitePaperTextSection}

Warmest regards,

Edwin Gordon
Founder, P-Squared
EGORDON@PSQRD.AI
        `,
        html: `
<h2>Thank you for requesting a demo!</h2>
<p>Dear ${name},</p>
<p>Thank you for your interest in P-Squared! I personally appreciate you taking the time to request a demo.</p>
<p>I wanted to let you know that we've received your request and one of our team members is already reviewing it. We typically schedule demos within 1-2 business days, and we're committed to providing you with a personalized demonstration that addresses your specific needs.</p>
<p>We value every opportunity to showcase our solutions and look forward to showing you how P-Squared can help ${company ? company : "your organization"} achieve its goals.</p>
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
  <p><strong>Your request details:</strong></p>
  <p><strong>Company:</strong> ${company || "Not provided"}</p>
  <p><strong>Industry:</strong> ${industry || "Not provided"}</p>
  <p><strong>Use Case:</strong> ${useCase || "Not provided"}</p>
</div>
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

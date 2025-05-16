import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getMicrosoftTokens } from "@/lib/auth/microsoft-oauth"

/**
 * Create an email transporter with Outlook/Office 365 integration
 * Supports both OAuth2 (preferred) and basic authentication
 */
async function createTransporter() {
  // Define types for nodemailer configuration
  type AuthConfig = {
    user: string;
    pass?: string;
    type?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
    accessToken?: string;
  };

  type TransportConfig = {
    host: string;
    port: number;
    secure: boolean;
    auth: AuthConfig;
    tls: {
      ciphers: string;
      rejectUnauthorized: boolean;
    };
  };

  // Basic configuration for Outlook/Office 365
  const transportConfig: TransportConfig = {
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "your-email@example.com",
      pass: process.env.SMTP_PASSWORD || "your-password"
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: process.env.NODE_ENV === "production" // Only disable in development
    }
  };

  // Check if we're using OAuth2 authentication
  const useOAuth = process.env.OAUTH_CLIENT_ID && 
                   process.env.OAUTH_CLIENT_SECRET && 
                   process.env.MICROSOFT_TENANT_ID;
  
  if (useOAuth) {
    try {
      // Get fresh tokens using our OAuth utility
      const { accessToken, refreshToken } = await getMicrosoftTokens();
      
      // Use OAuth2 authentication
      transportConfig.auth = {
        type: 'OAuth2',
        user: process.env.SMTP_USER || "your-email@example.com",
        clientId: process.env.OAUTH_CLIENT_ID!,
        clientSecret: process.env.OAUTH_CLIENT_SECRET!,
        refreshToken,
        accessToken
      };
      
      console.log("Using OAuth2 authentication for email");
    } catch (error) {
      console.error("OAuth2 authentication failed, falling back to password auth:", error);
      // We'll fall back to password authentication
    }
  }

  return nodemailer.createTransport(transportConfig);
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

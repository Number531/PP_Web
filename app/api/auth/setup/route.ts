import { NextResponse } from "next/server";
import { getAuthorizationUrl } from "@/lib/auth/microsoft-oauth";

/**
 * OAuth2 setup helper for Microsoft authentication
 * This endpoint generates the authorization URL for the initial setup
 */
export async function GET(request: Request) {
  try {
    // Only allow this endpoint in development or with a special key
    if (process.env.NODE_ENV === "production") {
      const url = new URL(request.url);
      const setupKey = url.searchParams.get("key");
      
      // Simple protection for production setup
      if (setupKey !== process.env.SETUP_KEY) {
        return NextResponse.json(
          { error: "Not authorized" },
          { status: 401 }
        );
      }
    }
    
    // Generate the authorization URL
    const authUrl = getAuthorizationUrl();
    
    // Return HTML with instructions and a link
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Microsoft OAuth Setup for psqrd.ai</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 { color: #0078d4; }
            .container { 
              background: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 5px;
              padding: 20px;
              margin: 20px 0;
            }
            .btn {
              display: inline-block;
              background: #0078d4;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            }
            code {
              background: #f0f0f0;
              padding: 2px 5px;
              border-radius: 3px;
            }
            .warning {
              background: #fff8e1;
              border-left: 4px solid #ffc107;
              padding: 10px 15px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <h1>Microsoft OAuth Setup for psqrd.ai</h1>
          <div class="container">
            <h2>Instructions</h2>
            <p>This page helps you set up OAuth2 authentication with Microsoft for your application's email functionality.</p>
            <ol>
              <li>Click the "Start Authentication" button below</li>
              <li>Sign in with your Microsoft account that has admin permissions</li>
              <li>Grant the requested permissions</li>
              <li>You'll be redirected back to your application</li>
              <li>Check your server logs for the refresh token</li>
              <li>Add the refresh token to your environment variables as <code>OAUTH_REFRESH_TOKEN</code></li>
            </ol>
            
            <div class="warning">
              <strong>Important:</strong> This setup should only be performed once to obtain the refresh token.
              The refresh token is sensitive information and should be stored securely.
            </div>
            
            <p>
              <a href="${authUrl}" class="btn">Start Authentication</a>
            </p>
          </div>
          
          <div>
            <h3>Application Details</h3>
            <p>Client ID: ${process.env.OAUTH_CLIENT_ID || 'Not configured'}</p>
            <p>Tenant ID: ${process.env.MICROSOFT_TENANT_ID || 'Not configured'}</p>
            <p>Redirect URI: ${process.env.OAUTH_REDIRECT_URI || 'https://psqrd.ai/api/auth/callback'}</p>
          </div>
        </body>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return NextResponse.json(
      { error: "Failed to generate authorization URL" },
      { status: 500 }
    );
  }
}

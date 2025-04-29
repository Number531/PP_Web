import { NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/auth/microsoft-oauth";

/**
 * OAuth2 callback handler for Microsoft authentication
 * This endpoint receives the authorization code after user login
 * 
 * Configured for the psqrd.ai domain
 */
export async function GET(request: Request) {
  try {
    // Get the authorization code from the URL
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");
    
    // Log the request origin for debugging
    console.log(`OAuth callback received from: ${request.headers.get("origin") || "unknown origin"}`);
    console.log(`Request URL: ${request.url}`);
    
    // Handle error response from Microsoft
    if (error) {
      console.error(`OAuth error: ${error}. Description: ${errorDescription}`);
      return NextResponse.json(
        { error, errorDescription },
        { status: 400 }
      );
    }
    
    if (!code) {
      return NextResponse.json(
        { error: "No authorization code provided" },
        { status: 400 }
      );
    }
    
    // Exchange the code for tokens
    const tokenResponse = await exchangeCodeForTokens(code);
    
    // For security, we don't return the tokens directly in the response
    // Instead, we log them to the console during setup
    console.log("======= IMPORTANT: SAVE THIS REFRESH TOKEN =======");
    console.log(`OAUTH_REFRESH_TOKEN=${tokenResponse.refresh_token}`);
    console.log("Add this to your .env.production file and keep it secure!");
    console.log("====================================================");
    
    // Provide a user-friendly response
    return NextResponse.json(
      { 
        success: true, 
        message: "Authentication successful for psqrd.ai! Check your server logs for the refresh token.",
        domain: "psqrd.ai"
      }
    );
  } catch (error) {
    console.error("Error in OAuth callback:", error);
    return NextResponse.json(
      { 
        error: "Authentication failed", 
        message: "See server logs for details",
        domain: "psqrd.ai"
      },
      { status: 500 }
    );
  }
}

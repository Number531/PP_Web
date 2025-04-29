/**
 * Microsoft OAuth2 Setup Utility
 * 
 * This script helps you set up OAuth2 authentication with Microsoft for your application.
 * Run this script to generate an authorization URL, then follow the steps to get a refresh token.
 */

import { getAuthorizationUrl } from "../lib/auth/microsoft-oauth";
import dotenv from "dotenv";

// Load environment variables from .env.local or .env
dotenv.config({ path: ".env.local" });
if (!process.env.OAUTH_CLIENT_ID) {
  dotenv.config(); // Try default .env
}

function printInstructions() {
  console.log("\n=== Microsoft OAuth2 Setup Instructions ===\n");
  console.log("This utility will help you set up OAuth2 authentication with Microsoft.");
  console.log("Before proceeding, make sure you have:");
  console.log("1. Registered an application in the Azure Portal");
  console.log("2. Added the Microsoft Graph Mail.Send permission");
  console.log("3. Created a client secret");
  console.log("4. Added the following to your .env.local file:");
  console.log("   - OAUTH_CLIENT_ID=your-client-id");
  console.log("   - OAUTH_CLIENT_SECRET=your-client-secret");
  console.log("   - OAUTH_REDIRECT_URI=http://localhost:3000/api/auth/callback");
  console.log("   - MICROSOFT_TENANT_ID=your-tenant-id");
  console.log("\nThe tenant ID can be found in the Azure Portal under 'App registrations' > your app > 'Directory (tenant) ID'");
  console.log("\n===========================================\n");
}

function checkRequiredEnvVars() {
  const required = [
    "OAUTH_CLIENT_ID",
    "OAUTH_CLIENT_SECRET",
    "OAUTH_REDIRECT_URI",
    "MICROSOFT_TENANT_ID"
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error("\n❌ Missing required environment variables:");
    missing.forEach(key => console.error(`   - ${key}`));
    console.error("\nPlease add these to your .env.local file and try again.");
    return false;
  }
  
  return true;
}

async function main() {
  printInstructions();
  
  if (!checkRequiredEnvVars()) {
    process.exit(1);
  }
  
  try {
    // Generate the authorization URL
    const authUrl = getAuthorizationUrl();
    
    console.log("✅ Environment variables found!");
    console.log("\n=== Next Steps ===\n");
    console.log("1. Make sure your application is running (npm run dev)");
    console.log("2. Open the following URL in your browser:");
    console.log("\n" + authUrl + "\n");
    console.log("3. Sign in with your Microsoft account");
    console.log("4. After successful authentication, you'll be redirected to your callback URL");
    console.log("5. Check your server logs for the refresh token");
    console.log("6. Add the refresh token to your .env.production file as OAUTH_REFRESH_TOKEN");
    console.log("\nIMPORTANT: Keep your refresh token secure! It provides access to your email account.");
    
  } catch (error) {
    console.error("Error generating authorization URL:", error);
    process.exit(1);
  }
}

main().catch(console.error);

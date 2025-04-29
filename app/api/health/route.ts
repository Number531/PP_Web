import { NextResponse } from "next/server"

/**
 * Health check endpoint for monitoring services
 * GET /api/health
 */
export async function GET() {
  try {
    // Basic health check information
    const health = {
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
    }

    // You can add more health checks here, like database connectivity
    // Example: const dbStatus = await checkDatabaseConnection();

    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: Date.now(),
      },
      { status: 500 },
    )
  }
}

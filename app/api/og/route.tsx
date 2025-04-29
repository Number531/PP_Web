import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { siteConfig } from '../../seo/metadata-config'

export const runtime = 'edge'

/**
 * Dynamic OG Image API Route
 * 
 * Generates custom Open Graph images for social media sharing
 * Usage: /api/og?title=Page+Title&subtitle=Page+Subtitle&type=product
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    
    // Get parameters with defaults
    const title = searchParams.get('title') || siteConfig.name
    const subtitle = searchParams.get('subtitle') || siteConfig.description
    const type = searchParams.get('type') || 'default' // default, product, article, etc.
    
    // Font loading
    const interBold = await fetch(
      new URL('../../assets/fonts/Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())
    
    const interRegular = await fetch(
      new URL('../../assets/fonts/Inter-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())
    
    // Generate the OG image based on type
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6D28D9',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #7C3AED 2%, transparent 0%), radial-gradient(circle at 75px 75px, #8B5CF6 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '40px 60px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect width="60" height="60" rx="12" fill="#F3F4F6" />
              <path d="M30 15C21.716 15 15 21.716 15 30C15 38.284 21.716 45 30 45C38.284 45 45 38.284 45 30C45 21.716 38.284 15 30 15ZM30 20C32.761 20 35 22.239 35 25C35 27.761 32.761 30 30 30C27.239 30 25 27.761 25 25C25 22.239 27.239 20 30 20ZM30 40C25.582 40 21.73 37.435 20 33.64C20.045 30.82 25.667 29.25 30 29.25C34.318 29.25 39.955 30.82 40 33.64C38.27 37.435 34.418 40 30 40Z" fill="#6D28D9" />
            </svg>
            <div
              style={{
                marginLeft: 16,
                fontSize: 30,
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #F3F4F6, #D1D5DB)',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'Inter Bold',
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              padding: '0 20px',
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 16,
                fontFamily: 'Inter Bold',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 32,
                color: '#E9D5FF',
                lineHeight: 1.4,
                fontFamily: 'Inter Regular',
                maxWidth: '80%',
              }}
            >
              {subtitle}
            </p>
          </div>
          
          {/* Type badge */}
          {type !== 'default' && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 9999,
                padding: '8px 16px',
                fontSize: 20,
                color: 'white',
                fontFamily: 'Inter Regular',
                textTransform: 'capitalize',
              }}
            >
              {type}
            </div>
          )}
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'calc(100% - 120px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 20,
            }}
          >
            <p
              style={{
                fontSize: 24,
                color: '#E9D5FF',
                fontFamily: 'Inter Regular',
              }}
            >
              {siteConfig.url.replace('https://', '')}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter Bold',
            data: interBold,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Inter Regular',
            data: interRegular,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}

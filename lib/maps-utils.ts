/**
 * Maps Utility Functions
 * Extract latitude and longitude from various Google Maps URL formats
 */

/**
 * Extract coordinates from Google Maps URL
 * Supports multiple formats:
 * - https://maps.app.goo.gl/xxx (shortened link)
 * - https://www.google.com/maps?q=lat,lng
 * - https://www.google.com/maps/@lat,lng,zoom
 * - https://www.google.com/maps/place/xxx/@lat,lng
 */
export async function extractCoordinatesFromMapsUrl(url: string): Promise<{
  latitude: number
  longitude: number
} | null> {
  try {
    // Handle shortened Google Maps links (goo.gl or maps.app.goo.gl)
    if (url.includes('goo.gl') || url.includes('maps.app.goo.gl')) {
      // Fetch the redirect URL
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow'
      })
      url = response.url
    }

    // Pattern 1: ?q=lat,lng or ?q=lat+lng
    const qPattern = /[?&]q=(-?\d+\.?\d*)[,+](-?\d+\.?\d*)/
    const qMatch = url.match(qPattern)
    if (qMatch) {
      return {
        latitude: parseFloat(qMatch[1]),
        longitude: parseFloat(qMatch[2])
      }
    }

    // Pattern 2: @lat,lng,zoom or @lat,lng
    const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/
    const atMatch = url.match(atPattern)
    if (atMatch) {
      return {
        latitude: parseFloat(atMatch[1]),
        longitude: parseFloat(atMatch[2])
      }
    }

    // Pattern 3: /place/xxx/@lat,lng
    const placePattern = /place\/[^/]+\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/
    const placeMatch = url.match(placePattern)
    if (placeMatch) {
      return {
        latitude: parseFloat(placeMatch[1]),
        longitude: parseFloat(placeMatch[2])
      }
    }

    // Pattern 4: ll=lat,lng
    const llPattern = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/
    const llMatch = url.match(llPattern)
    if (llMatch) {
      return {
        latitude: parseFloat(llMatch[1]),
        longitude: parseFloat(llMatch[2])
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting coordinates:', error)
    return null
  }
}

/**
 * Validate if string is a valid Google Maps URL
 */
export function isValidGoogleMapsUrl(url: string): boolean {
  const patterns = [
    /maps\.google\.com/,
    /google\.com\/maps/,
    /maps\.app\.goo\.gl/,
    /goo\.gl\/maps/
  ]
  return patterns.some(pattern => pattern.test(url))
}

/**
 * Get current device location using Geolocation API
 */
export function getCurrentLocation(): Promise<{
  latitude: number
  longitude: number
} | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        console.error('Geolocation error:', error)
        resolve(null)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
}

/**
 * Generate Google Maps embed URL
 */
export function generateMapsEmbedUrl(latitude: number, longitude: number, zoom: number = 15): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}&output=embed&z=${zoom}`
}

/**
 * Generate Google Maps link URL
 */
export function generateMapsLinkUrl(latitude: number, longitude: number): string {
  return `https://www.google.com/maps?q=${latitude},${longitude}`
}

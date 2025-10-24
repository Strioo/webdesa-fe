interface WeatherData {
  temp: number
  tempHigh: number
  tempLow: number
  humidity: number
  rainfall: number
  pressure: number
  location: string
}

const BATURADEN_LAT = -7.3167
const BATURADEN_LON = 109.2333

const FALLBACK_WEATHER: WeatherData = {
  location: 'Baturaden, Banyumas',
  temp: 22,
  tempHigh: 25,
  tempLow: 18,
  humidity: 65,
  rainfall: 0,
  pressure: 1012
}

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) 

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${BATURADEN_LAT}&longitude=${BATURADEN_LON}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Jakarta&forecast_days=1`,
      {
        signal: controller.signal,
        next: { revalidate: 1800 } 
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`Weather API returned status: ${response.status}`)
      return FALLBACK_WEATHER
    }

    const data = await response.json()
    if (!data.current || typeof data.current.temperature_2m !== 'number') {
      console.warn('Invalid weather data structure')
      return FALLBACK_WEATHER
    }

    return {
      location: 'Baturaden, Banyumas',
      temp: Math.round(data.current.temperature_2m),
      tempHigh: Math.round(data.daily.temperature_2m_max[0]),
      tempLow: Math.round(data.daily.temperature_2m_min[0]),
      humidity: Math.round(data.current.relative_humidity_2m),
      rainfall: data.current.precipitation || 0,
      pressure: Math.round(data.current.surface_pressure)
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Weather API request timeout')
      } else {
        console.warn('Weather API error:', error.message)
      }
    }
    return FALLBACK_WEATHER
  }
}

import axios from 'axios'
import responseStaticJSON from './response/countries.json'

async function getCountryCodes(): Promise<any[]> {
  const apiKey = process.env.API_KEY
  const isDevMode = process.env.NODE_ENV !== 'production'

  if (apiKey === undefined) {
    throw new Error('API key missing')
  }

  let responseData: any

  try {
    if (isDevMode) {
      responseData = responseStaticJSON
    } else {
      const response = await axios.get('https://api.footprintnetwork.org/v1/countries', {
        auth: {
          username: 'Standard issue cat',
          password: apiKey
        }
      })

      responseData = response.data
    }
  } catch (error) {
    throw new Error(error as any)
  }

  return responseData
}

export { getCountryCodes }
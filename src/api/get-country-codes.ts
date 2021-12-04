import axios from 'axios'
import responseStaticJSON from './response/countries.json'
import type {Country, CountryList, CountryNameCodeMap} from '../types/api'

function getCountryNameCodeMap (countriesList: Country[]): CountryNameCodeMap {
  const countryList: CountryList = countriesList.map(({countryName, countryCode}) => [countryName, countryCode])
  const countryMap: CountryNameCodeMap = Object.fromEntries(countryList);

  return countryMap
}

async function getCountryCodes(): Promise<CountryNameCodeMap> {
  const apiKey = process.env.API_KEY
  const isDevMode = process.env.NODE_ENV !== 'production'

  if (apiKey === undefined) {
    throw new Error('API key missing')
  }

  let countryNameCodeMap: CountryNameCodeMap

  try {
    let responseData: Country[]

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

    countryNameCodeMap = getCountryNameCodeMap(responseData)
  } catch (error) {
    throw new Error(error as any)
  }

  return countryNameCodeMap
}

export { getCountryCodes }
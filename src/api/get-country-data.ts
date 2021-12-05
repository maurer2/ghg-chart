
import axios from 'axios'
import responseStaticJSON10 from './response/country10.json'
import responseStaticJSON100 from './response/country100.json'
import responseStaticJSON150 from './response/country150.json'
import type { Country, CountryDataResponse, CountryEmissionsYearValueList, CountryEmissionsYearList, CountryEmissionsYearListKeyed } from '../types/api'

function getYearCarbonMapping(countryData: CountryDataResponse[], id: Country['id']): CountryEmissionsYearListKeyed {
  const yearCarbonMap: CountryEmissionsYearValueList = countryData.map((country) => [country.year, country.carbon])
  const countryMap: CountryEmissionsYearList = Object.fromEntries(yearCarbonMap);

  const keyedList: CountryEmissionsYearListKeyed = {
    [id]: countryMap
  }

  return keyedList
}

async function getCountryData(id: Country['id']): Promise<CountryEmissionsYearListKeyed> {
  const apiKey = process.env.API_KEY
  const isDevMode = process.env.NODE_ENV !== 'production'

  if (apiKey === undefined) {
    throw new Error('API key missing')
  }

  let countryYearCarbonList

  try {
    let responseData: any

    if (isDevMode) {
      if (id === 100) {
        responseData = responseStaticJSON100
      } else {
        if (id === 150) {
          responseData = responseStaticJSON150
        } else {
          responseData = responseStaticJSON10
        }
      }
    } else {
      const response = await axios.get(`https://api.footprintnetwork.org/v1/data/${id}/all/EFCpc`, {
        auth: {
          username: 'Standard issue cat',
          password: apiKey
        }
      })

      responseData = response.data
    }

    countryYearCarbonList = getYearCarbonMapping(responseData, id)

  } catch (error) {
    throw new Error(error as any)
  }

  return countryYearCarbonList
}

export { getCountryData }
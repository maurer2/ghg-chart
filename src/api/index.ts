import * as countryCodesApi from './get-country-codes';
import * as countryDataApi from './get-country-data';
import * as pollutionDataApi from './get-pollution-data';

import type { CountryEmissionsYearListKeyed } from '../types/api'

require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()

  const countryData1 = countryDataApi.getCountryData(100)
  const countryData2 = countryDataApi.getCountryData(1)

  Promise.allSettled([countryData1, countryData2])
    .then((results) => {
      const mappedEntries = results
        .filter(result => result.status === 'fulfilled')
        .map((fulfilledPromise) => {
          const entry = fulfilledPromise as PromiseFulfilledResult<CountryEmissionsYearListKeyed>

          const [key] = Object.keys(entry.value)
          const value = entry.value[key]

          return [key, value]
        })

      const mergedOject: CountryEmissionsYearListKeyed = Object.fromEntries(mappedEntries)

      pollutionDataApi.getPollutionData(mergedOject)
    })

} catch (error) {
  throw new Error(error as any)
}

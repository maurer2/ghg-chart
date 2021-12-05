import * as countryCodesApi from './get-country-codes';
import * as countryDataApi from './get-country-data';
import * as pollutionDataApi from './get-pollution-data';

import type { CountryEmissionsYearListKeyed } from '../types/api'

require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()

  console.log(countryCodes)

  // temp
  const ids = [10, 100, 150]
  const requests = ids.map((id) => countryDataApi.getCountryData(id))

  Promise.allSettled(requests)
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

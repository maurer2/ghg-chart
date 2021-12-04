import * as countryCodesApi from './get-country-codes'
import * as countryDataApi from './get-country-data'

require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()

  const countryData1 = countryDataApi.getCountryData(100)
  const countryData2 = countryDataApi.getCountryData(1)

  Promise.allSettled([countryData1, countryData2])
    .then((results) => results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(result.status, result.value);
      } else {
        console.log(result.status, result.reason);
      }
    }))

} catch (error) {
  throw new Error(error as any)
}

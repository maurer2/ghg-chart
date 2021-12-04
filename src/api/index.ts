import * as countryCodesApi from './get-country-codes'
import * as countryDataApi from './get-country-data'

require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()
  const countryData = countryDataApi.getCountryData(100)

  countryData.then((value) => {
    console.log(value)
  })

} catch (error) {
  throw new Error(error as any)
}

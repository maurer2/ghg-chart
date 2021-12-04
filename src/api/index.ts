// @ts-ignore
import * as countryCodesApi from './get-country-codes.ts'
import * as countryDataApi from './get-country-data'
require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()
  const countryData = countryDataApi.getCountryData(100)

  console.log(countryData)

} catch (error) {
  throw new Error(error as any)
}

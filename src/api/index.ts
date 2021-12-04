// @ts-ignore
import * as countryCodesApi from './get-country-codes.ts'
require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()

  console.log(countryCodes)

} catch (error) {
  throw new Error(error as any)
}

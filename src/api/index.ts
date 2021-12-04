import * as countryCodesApi from './get-country-codes';
import * as countryDataApi from './get-country-data';

require('dotenv').config();

try {
  const countryCodes = countryCodesApi.getCountryCodes()

  const countryData1 = countryDataApi.getCountryData(100)
  const countryData2 = countryDataApi.getCountryData(1)

  Promise.allSettled([countryData1, countryData2])
    .then((results) => {
      const fulfilledPromises = results.filter(result => result.status === 'fulfilled')

      const mappedEntries = fulfilledPromises.map((fulfilledPromise) => {
        const entry = fulfilledPromise as PromiseFulfilledResult<any>
        const [key] = Object.keys(entry.value)

        console.log([key, entry.value[key]])

        return [key, entry.value[key]]
      })

      const mergedOject = Object.fromEntries(mappedEntries)

      console.log(mergedOject)
    })

} catch (error) {
  throw new Error(error as any)
}

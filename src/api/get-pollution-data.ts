
import type {  CountryEmissionsYearListKeyed } from '../types/api'

function getYears(countriesEmissionsList: CountryEmissionsYearListKeyed) {
  const yearsBag = Object.values(countriesEmissionsList).flatMap((dataEntry) => {
    const years = Object.keys(dataEntry)

    return years
  })

  const yearsSet = [...new Set(yearsBag)];

  return yearsSet
}

async function getPollutionData(countriesEmissionsList: CountryEmissionsYearListKeyed) {
  const years = getYears(countriesEmissionsList)
  const keyValueList = Object.entries(countriesEmissionsList)

  const emissionsByYears = years.map((year: any) => {
    const emissionsOfCurrentYearForIds = keyValueList.map((entry) => {
      const [id, yearsEmissionList] = entry

      const valueOfCurrentYear = yearsEmissionList[year]

      return {
        [id]: valueOfCurrentYear
      }
    })

    const emissionsByYearsWithIdsAndValues = [year, emissionsOfCurrentYearForIds]

    return emissionsByYearsWithIdsAndValues
  })

  const emissionsObject = Object.fromEntries(emissionsByYears)

  console.log(emissionsObject)

  return emissionsObject
}

export { getPollutionData }
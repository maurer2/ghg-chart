import type {  CountryEmissionsYearListKeyed } from '../types/api'

function getYears(countriesEmissionsList: CountryEmissionsYearListKeyed) {
  const yearsBag = Object.values(countriesEmissionsList).flatMap((dataEntry) => {
    const years = Object.keys(dataEntry)

    return years
  })

  const yearsSet = [...new Set(yearsBag)];

  return yearsSet
}

function getPopulationDataSortedForYear(emissionsByYears: any) {
  const emissionsByYearsSorted = emissionsByYears.map((entry: any) => {
    const [year, unsortedEmissions] = entry

    const sortedEmissionsInSingleYear = unsortedEmissions.sort((countryValueOne: any, countryValueTwo: any) => {
      // todo improve
      const [valueOne] = Object.values(countryValueOne) as any
      const [valueTwo] = Object.values(countryValueTwo) as any

      return valueTwo - valueOne
    })

    return {
      [year]: sortedEmissionsInSingleYear
    }
  })

  return Object.assign({}, ...emissionsByYearsSorted );
}

async function getPollutionData(countriesEmissionsList: CountryEmissionsYearListKeyed) {
  const years = getYears(countriesEmissionsList)
  const keyValueList = Object.entries(countriesEmissionsList)

  const emissionsByYears = years.map((year: string) => {
    const emissionsOfCurrentYearForIds = keyValueList.map((entry) => {
      const [id, yearsEmissionList] = entry

      const valueOfCurrentYear = yearsEmissionList[year as any]

      return {
        [id]: valueOfCurrentYear
      }
    })

    const emissionsByYearsWithIdsAndValues = [year, emissionsOfCurrentYearForIds]

    return emissionsByYearsWithIdsAndValues
  })

  const emissionsByYearsSorted = getPopulationDataSortedForYear(emissionsByYears)

  console.log(emissionsByYearsSorted)

  return emissionsByYearsSorted
}

export { getPollutionData }
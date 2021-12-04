
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
  const ids = Object.keys(countriesEmissionsList)

  console.log(countriesEmissionsList[ids[0]])

  const emissionsByYears = years.map((year: any) => {
    const entryFirst = countriesEmissionsList[ids[0]]
    const entrySecond = countriesEmissionsList[ids[1]]

    const valueOfCurrentYearFirst = entryFirst[year]
    const valueOfCurrentYearSecond = entrySecond[year]

    console.log(year)
    console.log(ids[0], valueOfCurrentYearFirst)
    console.log(ids[1], valueOfCurrentYearSecond)

    return year
  })

  // console.log(emissionsByYears)
}

export { getPollutionData }
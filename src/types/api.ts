export type Country = {
  id: number;
  version?: any;
  countryCode: string;
  countryName: string;
  shortName: string;
  isoa2: any;
  score: any;
}

export type CountryList = [Country['countryName'], Country['countryCode']][]

export type CountryNameCodeMap = Record<Country['countryName'], Country['countryCode']>

export type CountryDataResponse = {
  id: number;
  version?: any;
  year: number;
  countryCode: number;
  countryName: string;
  shortName: string;
  isoa2: string;
  record: string;
  cropLand: number;
  grazingLand: number;
  forestLand: number;
  fishingGround: number;
  builtupLand: number;
  carbon: number;
  value: number;
  score: string;
}

export type CountryEmissionsYearValue = [CountryDataResponse['year'], CountryDataResponse['carbon']]

export type CountryEmissionsYearValueList = CountryEmissionsYearValue[]

export type CountryEmissionsYearList = Record<CountryDataResponse['year'], CountryDataResponse['carbon']>

export type CountryEmissionsYearListKeyed = {
  [key: string]: CountryEmissionsYearList
}

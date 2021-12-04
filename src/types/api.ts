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

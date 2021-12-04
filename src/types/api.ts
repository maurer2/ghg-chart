export type Country = {
  id: number;
  version?: any;
  countryCode: string;
  countryName: string;
  shortName: string;
  isoa2: string;
  score: string;
}

export type CountryNameCodeMapping = Record<Country['countryName'], Country['countryCode']>

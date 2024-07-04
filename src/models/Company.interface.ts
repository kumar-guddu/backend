export interface ICompany {
    type: string
    symbol: string
    name: string
    ticker: string
    cik: string
    cusip: string
    exchange: string
    isDelisted: string
    category: string
    sector: string
    industry: string
    sic: string
    sicSector: string
    sicIndustry: string
    famaSector: string
    famaIndustry: string
    currency: string
    location: string
    id: string
}

export interface ICompanySearch {
    symbol: string;
    name: string;
    type: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    timezone: string;
    currency: string;
    matchScore: string;
  }
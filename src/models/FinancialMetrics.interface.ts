export interface HistoricalData {
  date: string;
  value: string;
}

export interface Report {
  fiscalDateEnding: string;
  [key: string]: string | number | undefined;
}

export interface Ratio {
  key: string;
  name: string;
  formula: string;
  description: string;
  historicalData: HistoricalData[];
}

export interface Metric {
  key: string;
  name: string;
  formula: string;
  description: string;
  historicalData: HistoricalData[];
}

export interface BalanceSheetReport {
  fiscalDateEnding: string;
  reportedCurrency: string;
  [key: string]: string;
}

export interface BalanceSheet {
  annualReports: BalanceSheetReport[];
}

export interface CashFlowReport {
  fiscalDateEnding: string;
  reportedCurrency: string;
  [key: string]: string;
}

export interface CashFlow {
  annualReports: CashFlowReport[];
}

export interface IncomeStatementReport {
  fiscalDateEnding: string;
  reportedCurrency: string;
  [key: string]: string;
}

export interface IncomeStatement {
  annualReports: IncomeStatementReport[];
}

export interface Overview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}

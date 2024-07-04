// Interface for individual Balance Sheet data points
export interface BalanceSheetData {
  id: number;
  symbol: string;
  fiscalDateEnding: Date;
  reportedCurrency?: string;
  totalAssets?: number;
  totalCurrentAssets?: number;
  cashAndCashEquivalentsAtCarryingValue?: number;
  cashAndShortTermInvestments?: number;
  inventory?: number;
  currentNetReceivables?: number;
  totalNonCurrentAssets?: number;
  propertyPlantEquipment?: number;
  accumulatedDepreciationAmortizationPPE?: number;
  intangibleAssets?: number;
  intangibleAssetsExcludingGoodwill?: number;
  goodwill?: number;
  investments?: number;
  longTermInvestments?: number;
  shortTermInvestments?: number;
  otherCurrentAssets?: number;
  otherNonCurrentAssets?: number;
  totalLiabilities?: number;
  totalCurrentLiabilities?: number;
  currentAccountsPayable?: number;
  deferredRevenue?: number;
  currentDebt?: number;
  shortTermDebt?: number;
  totalNonCurrentLiabilities?: number;
  capitalLeaseObligations?: number;
  longTermDebt?: number;
  currentLongTermDebt?: number;
  longTermDebtNoncurrent?: number;
  shortLongTermDebtTotal?: number;
  otherCurrentLiabilities?: number;
  otherNonCurrentLiabilities?: number;
  totalShareholderEquity?: number;
  treasuryStock?: number;
  retainedEarnings?: number;
  commonStock?: number;
  commonStockSharesOutstanding?: number;
}

// Metrics Interface for flexible balance sheet representation
export interface Metric {
  metric: keyof BalanceSheetData;
  hasChildren: boolean;
  children: Metric[];
  data?: Record<string, string>; // Optional field for carrying the data points
}

// Root level interface to encapsulate the entire response structure
export interface BalanceSheetResponse {
  balanceSheet: Metric[];
}

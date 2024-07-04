export interface CashFlowData {
  id: number;
  symbol: string;
  fiscalDateEnding: Date;
  reportedCurrency: string | null;
  operatingCashflow: number | null;
  paymentsForOperatingActivities: number | null;
  proceedsFromOperatingActivities: number | null;
  changeInOperatingLiabilities: number | null;
  changeInOperatingAssets: number | null;
  depreciationDepletionAndAmortization: number | null;
  capitalExpenditures: number | null;
  changeInReceivables: number | null;
  changeInInventory: number | null;
  profitLoss: number | null;
  cashflowFromInvestment: number | null;
  cashflowFromFinancing: number | null;
  proceedsFromRepaymentsOfShortTermDebt: number | null;
  paymentsForRepurchaseOfCommonStock: number | null;
  paymentsForRepurchaseOfEquity: number | null;
  paymentsForRepurchaseOfPreferredStock: number | null;
  dividendPayout: number | null;
  dividendPayoutCommonStock: number | null;
  dividendPayoutPreferredStock: number | null;
  proceedsFromIssuanceOfCommonStock: number | null;
  proceedsFromIssuanceOfLongTermDebtAndCapitalSecurities: number | null;
  proceedsFromIssuanceOfPreferredStock: number | null;
  proceedsFromRepurchaseOfEquity: number | null;
  proceedsFromSaleOfTreasuryStock: number | null;
  changeInCashAndCashEquivalents: number | null;
  changeInExchangeRate: number | null;
  netIncome: number | null;
  createdAt: Date;
}

export interface Metric {
  metric: keyof CashFlowData;
  hasChildren: boolean;
  children: Metric[];
  data?: Record<string, string>;
}


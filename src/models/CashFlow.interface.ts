export interface AnnualReport {
      fiscalDateEnding: string;
      reportedCurrency: string;
      operatingCashflow: string;
      paymentsForOperatingActivities: string;
      proceedsFromOperatingActivities: string;
      changeInOperatingLiabilities: string;
      changeInOperatingAssets: string;
      depreciationDepletionAndAmortization: string;
      capitalExpenditures: string;
      changeInReceivables: string;
      changeInInventory: string;
      profitLoss: string;
      cashflowFromInvestment: string;
      cashflowFromFinancing: string;
      proceedsFromRepaymentsOfShortTermDebt: string;
      paymentsForRepurchaseOfCommonStock: string;
      paymentsForRepurchaseOfEquity: string;
      paymentsForRepurchaseOfPreferredStock: string;
      dividendPayout: string;
      dividendPayoutCommonStock: string;
      dividendPayoutPreferredStock: string;
      proceedsFromIssuanceOfCommonStock: string;
      proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string;
      proceedsFromIssuanceOfPreferredStock: string;
      proceedsFromRepurchaseOfEquity: string;
      proceedsFromSaleOfTreasuryStock: string;
      changeInCashAndCashEquivalents: string;
      changeInExchangeRate: string;
      netIncome: string;
      [key: string]: string; 
}

export interface QuarterlyReport {
    fiscalDateEnding: string;
    reportedCurrency: string;
    operatingCashflow: string;
    paymentsForOperatingActivities: string;
    proceedsFromOperatingActivities: string;
    changeInOperatingLiabilities: string;
    changeInOperatingAssets: string;
    depreciationDepletionAndAmortization: string;
    capitalExpenditures: string;
    changeInReceivables: string;
    changeInInventory: string;
    profitLoss: string;
    cashflowFromInvestment: string;
    cashflowFromFinancing: string;
    proceedsFromRepaymentsOfShortTermDebt: string;
    paymentsForRepurchaseOfCommonStock: string;
    paymentsForRepurchaseOfEquity: string;
    paymentsForRepurchaseOfPreferredStock: string;
    dividendPayout: string;
    dividendPayoutCommonStock: string;
    dividendPayoutPreferredStock: string;
    proceedsFromIssuanceOfCommonStock: string;
    proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string;
    proceedsFromIssuanceOfPreferredStock: string;
    proceedsFromRepurchaseOfEquity: string;
    proceedsFromSaleOfTreasuryStock: string;
    changeInCashAndCashEquivalents: string;
    changeInExchangeRate: string;
    netIncome: string;
    [key: string]: string; 
}


export interface CashFlow{
    symbol: string;
    annualReports: AnnualReport[];
    quarterlyReports: QuarterlyReport[];
}
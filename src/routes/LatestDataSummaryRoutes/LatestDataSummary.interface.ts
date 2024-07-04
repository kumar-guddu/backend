export interface ILatestBalanceSheetReport {
    totalCash: string,
    totalCashPerShare: string,
    totalDebt: string,
    totalDebtToEquity: string,
    currentRatio: string,
    quickRatio: string,
  }
   
export interface ILatestIncomeStatementReport {
  
    revenue: string,
    revenuePerShare: string,
    grossProfit: string ,
    ebidta: string,
    netIncome: string,
    epsDiluted: string
  }
  
export interface ILatestCashFlowReport {
    cashFromOperations: string,
    cashFromInvesting: string,
    leveredFreeCashFlow: string,
    unLeveredFreeCashFlow: string,
    freeCashFlowPerShare: string 
  }


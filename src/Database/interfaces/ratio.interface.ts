// src/Database/interfaces/ratio.interface.ts

export interface FinancialRecord {
  fiscalDateEnding: Date | string;
  [key: string]: number | string | null | Date;
}

export interface FinancialData {
  incomeStatementAnnual: FinancialRecord[];
  incomeStatementQuarterly: FinancialRecord[];
  balanceSheetAnnual: FinancialRecord[];
  balanceSheetQuarterly: FinancialRecord[];
  cashFlowAnnual: FinancialRecord[];
  cashFlowQuarterly: FinancialRecord[];
  companyOverview: Record<string, number | string | null> | null;
}

export interface Ratio {
  ratioId: number;
  name: string;
  formula: string;
  description: string;
  parameters: string[];
}

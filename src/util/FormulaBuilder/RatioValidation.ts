import { ratios, incomeStatementMetrics, cashFlowMetrics, balanceSheetMetrics } 
  from "@src/constants/Data/metricsData";

const validKeys = [
  ...ratios.map(r => r.key),
  ...incomeStatementMetrics.map(m => m.key),
  ...cashFlowMetrics.map(m => m.key),
  ...balanceSheetMetrics.map(m => m.key),
];

export function validateFormula(formula: string): boolean {
  const formulaKeys = formula.match(/\b\w+\b/g);
  if (!formulaKeys) return false;
  return formulaKeys.every(key => validKeys.includes(key));
}

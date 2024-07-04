// import { create, all } from 'mathjs';

// const math = create(all, {});

const nameToKeyMap: Record<string, string> = {
  "Trailing Price to Earning Ratio": "TrailingPE",
  "Forward Price to Earning Ratio": "ForwardPE",
  "Price to Sales Ratio (TTM)": "PriceToSalesRatioTTM",
  "Price to Book Ratio": "PriceToBookRatio",
  "Enterprise Value to Revenue": "EVToRevenue",
  "Enterprise Value to EBITDA": "EVToEBITDA",
  "PEG Ratio": "PEGRatio",
  "Beta": "Beta",
  "Profit Margin": "ProfitMargin",
  "Operating Margin (TTM)": "OperatingMarginTTM",
  "Return on Assets (TTM)": "ReturnOnAssetsTTM",
  "Return on Equity (TTM)": "ReturnOnEquityTTM",
  "Revenue (TTM)": "RevenueTTM",
  "Gross Profit (TTM)": "GrossProfitTTM",
  "Gross Profit": "grossProfit",
  "Total Revenue": "totalRevenue",
  "Cost of Revenue": "costOfRevenue",
  "Operating Income": "operatingIncome",
  // eslint-disable-next-line max-len
  "Selling, General and Administrative Expenses": "sellingGeneralAndAdministrative",
  "Research and Development Expenses": "researchAndDevelopment",
  "Net Income": "netIncome",
  "Operating Cash Flow": "operatingCashflow",
  "Capital Expenditures": "capitalExpenditures",
  "Cash Flow from Investment": "cashflowFromInvestment",
  "Cash Flow from Financing": "cashflowFromFinancing",
  "Dividend Payout": "dividendPayout",
  "Total Assets": "totalAssets",
  "Total Current Assets": "totalCurrentAssets",
  "Cash and Cash Equivalents": "cashAndCashEquivalentsAtCarryingValue",
  "Inventory": "inventory",
  "Net Receivables": "currentNetReceivables",
  "Total Liabilities": "totalLiabilities",
  "Total Current Liabilities": "totalCurrentLiabilities",
  "Short Term Debt": "shortTermDebt",
  "Long Term Debt": "longTermDebt",
  "Total Shareholder Equity": "totalShareholderEquity",
};

// Create a reverse mapping from keys to names
const keyToNameMap: Record<string, string> = {};
for (const [name, key] of Object.entries(nameToKeyMap)) {
  keyToNameMap[key] = name;
}


export const replaceNamesWithKeys = (formula: string): string => {
  const regex = new RegExp(Object.keys(nameToKeyMap).map(name => 
    name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
  return formula.replace(regex, matched => nameToKeyMap[matched]);
};

export const replaceKeysWithNames = (formula: string): string => {
  const regex = new RegExp(Object.keys(keyToNameMap).join("|"), "g");
  return formula.replace(regex, matched => keyToNameMap[matched]);
};

// eslint-disable-next-line max-len
// export const calculateFormula = (formula: string, data: Record<string, number>): number => {
// eslint-disable-next-line max-len
//   const replacedFormula = formula.replace(/\b[A-Za-z][A-Za-z0-9_]*\b/g, match => {
//     return data.hasOwnProperty(match) ? data[match].toString() : match;
//   });
//   return math.evaluate(replacedFormula);
// };
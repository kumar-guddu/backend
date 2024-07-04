// export interface ValuationRatios {
//     priceToEarningsRatio: Record<string, string>,
//     priceToSalesRatio: Record<string, string>,
//     priceToCashFlowRatio: Record<string, string>,
//     priceToBookRatio: Record<string, string>,
//     enterpriseRatio: Record<string, string>,
//     enterpriseValueToEbitdaRatio: Record<string, string>
// }

// export interface ProfitabilityRatios{
//     returnOfAssets:string,
//     returnOnEquity:string,
//     returnOnInvestedCapital:string,
//     grossMargin:string,
//     operatingMargin:string,
//     ebitdaMargin:string,
//     netMargin:string
// }

// export interface LiquidityRatios{
//     quickRatio:string,
//     currentRatio:string,
//     inventoryTurnover:string,
//     assetTurnover:string,
//     solvencyRatio:string,
//     debtToEquityRatio:string,
//     longTermDebtToTotalAssetsRatio:string,
//     longTermDebtToTotalEquityRatio:string,
// }

export interface ValuationRatios {
  metric: string;
  [year: string]: string;
}

export interface ProfitabilityRatios {
  metric: string;
  [year: string]: string;
}
export interface LiquidityRatios {
  metric: string;
  [year: string]: string;
}

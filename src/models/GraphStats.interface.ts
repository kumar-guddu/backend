export interface ValuationRatio {
  "2009": string;
  "2010": string;
  "2011": string;
  "2012": string;
  "2013": string;
  "2014": string;
  "2015": string;
  "2016": string;
  "2017"?: string;
  "2018"?: string;
  "2019"?: string;
  "2020"?: string;
  "2021"?: string;
  "2022"?: string;
  "2023"?: string;
  "metric": string;
}

export interface ProfitabilityRatio {
  "2009": string;
  "2010": string;
  "2011": string;
  "2012": string;
  "2013": string;
  "2014": string;
  "2015": string;
  "2016": string;
  "2017"?: string;
  "2018"?: string;
  "2019"?: string;
  "2020"?: string;
  "2021"?: string;
  "2022"?: string;
  "2023"?: string;
  "metric": string;
}

export interface LiquidityRatio {
  "2009": string;
  "2010": string;
  "2011": string;
  "2012": string;
  "2013": string;
  "2014": string;
  "2015": string;
  "2016": string;
  "2017"?: string;
  "2018"?: string;
  "2019"?: string;
  "2020"?: string;
  "2021"?: string;
  "2022"?: string;
  "2023"?: string;
  "metric": string;
}

export interface StatsResponse {
  valuationRatios: ValuationRatio[];
  profitabilityRatios: ProfitabilityRatio[];
  liquidityRatios: LiquidityRatio[];
}

export interface FormattedResponse {
  GraphStats: {
    ValuationRatios: {
      priceToEarningsRatio?: string;
      priceToCashFlowRatio?: string;
      priceToBookRatio?: string;
    };
    ProfitabilityRatios: {
      grossMargin?: string;
      operatingMargin?: string;
      netMargin?: string;
    };
    LiquidityRatios: {
      quickRatio?: string;
      inventoryTurnover?: string;
      debtToEquityRatio?: string;
    };
  };
}
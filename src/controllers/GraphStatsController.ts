import { Request, Response, NextFunction } from "express";
import { fetchStatsByTicker } from "@src/services/GraphStatsService";
import { FormattedResponse } from "@src/models/GraphStats.interface";

export const getFormattedStatsByTicker = 
async (req: Request, res: Response, next: NextFunction) => {
  const { ticker } = req.params;
  // console.log(ticker);

  try {
    // console.log(`Fetching data for ticker: ${ticker}`);
    const data = await fetchStatsByTicker(ticker);
    // console.log("Fetched data:", data); // Log the fetched data

    // Check if the required metrics are present in the fetched data
    const priceToEarningsRatio = 
    data.valuationRatios.find(ratio => ratio.metric === "priceToEarningsRatio");
    const priceToCashFlowRatio = 
    data.valuationRatios.find(ratio => ratio.metric === "priceToCashFlowRatio");
    const priceToBookRatio = 
    data.valuationRatios.find(ratio => ratio.metric === "priceToBookRatio");

    const grossMargin = 
    data.profitabilityRatios.find(ratio => ratio.metric === "grossMargin");
    const operatingMargin = 
    data.profitabilityRatios.find(ratio => ratio.metric === "operatingMargin");
    const netMargin = 
    data.profitabilityRatios.find(ratio => ratio.metric === "netMargin");

    // eslint-disable-next-line max-len
    // console.log("Valuation Ratios:", { priceToEarningsRatio, priceToCashFlowRatio, priceToBookRatio });
    // eslint-disable-next-line max-len
    // console.log("Profitability Ratios:", { grossMargin, operatingMargin, netMargin });

    const formattedResponse: FormattedResponse = {
      GraphStats: {
        ValuationRatios: {
          priceToEarningsRatio: priceToEarningsRatio?.["2023"] || "N/A",
          priceToCashFlowRatio: priceToCashFlowRatio?.["2023"] || "N/A",
          priceToBookRatio: priceToBookRatio?.["2023"] || "N/A",
        },
        ProfitabilityRatios: {
          grossMargin: grossMargin?.["2023"] || "N/A",
          operatingMargin: operatingMargin?.["2023"] || "N/A",
          netMargin: netMargin?.["2023"] || "N/A",
        },
        LiquidityRatios: {
          quickRatio: data.liquidityRatios.find(ratio => 
            ratio.metric === "quickRatio")?.["2023"] || "N/A",
          inventoryTurnover: data.liquidityRatios.find(ratio => 
            ratio.metric === "inventoryTurnover")?.["2023"] || "N/A",
          debtToEquityRatio: data.liquidityRatios.find(ratio => 
            ratio.metric === "debtToEquityRatio")?.["2023"] || "N/A",
        },
      },
    };

    res.json(formattedResponse);
  } catch (error) {
    next(error);
  }
};
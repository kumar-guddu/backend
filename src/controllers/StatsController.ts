import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { IReq, IRes } from "@src/routes/types/express/misc";
import {
  _quarterlyValuationRatios,
  _quarterlyProfitabilityRatios,
  _quarterlyLiquidityRatios,
  _annualValuationRatios,
  _annualProfitabilityRatios,
  _annualLiquidityRatios,
  add_data,
  metricsProfitability,
  metricsLiquidity,
  metricsValuation,
} from "@src/services/StatsService";
import balanceSheetData from "@src/constants/balanceSheet.json";
import incomeStatementData from "@src/constants/incomeStatement.json";

function getStatsByTicker(
  req: IReq<{ ticker: string; timeSeries: string }>,
  res: IRes,
) {
  try {
    // const { ticker } = req.params;
    const { timeSeries } = req.body;

    if (timeSeries === "QUARTER") {
      const valuationRatios = _quarterlyValuationRatios();
      const profitabilityRatios = _quarterlyProfitabilityRatios(
        incomeStatementData,
        balanceSheetData,
      );

      const liquidityRatios = _quarterlyLiquidityRatios(
        balanceSheetData,
        incomeStatementData,
      );

      add_data(metricsProfitability, profitabilityRatios);

      add_data(metricsLiquidity, liquidityRatios);
      add_data(metricsValuation, valuationRatios);

      const response = {
        valuationRatios: metricsValuation,
        profitabilityRatios: metricsProfitability,
        liquidityRatios: metricsLiquidity,
      };
      return res.status(HttpStatusCodes.OK).json(response);
    } else if (timeSeries === "ANNUAL") {
      const valuationRatios = _annualValuationRatios();
      const profitabilityRatios = _annualProfitabilityRatios(
        incomeStatementData,
        balanceSheetData,
      );
      const liquidityRatios = _annualLiquidityRatios(
        balanceSheetData,
        incomeStatementData,
      );

      add_data(metricsProfitability, profitabilityRatios);
      add_data(metricsLiquidity, liquidityRatios);
      add_data(metricsValuation, valuationRatios);

      const response = {
        valuationRatios: metricsValuation,
        profitabilityRatios: metricsProfitability,
        liquidityRatios: metricsLiquidity,
      };
      return res.status(HttpStatusCodes.OK).json(response);
    } else {
      return res.status(HttpStatusCodes.BAD_REQUEST).json("Bad request");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    } else {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "An unknown error occurred" });
    }
  }
}

export default { getStatsByTicker } as const;
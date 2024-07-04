import { IReq, IRes } from "@src/routes/types/express/misc";
import FinancialMetricsDataService
  from "@src/services/FormulaBuilderServices/FinancialMetricsDataService";
import {
  ratios,
  incomeStatementMetrics,
  cashFlowMetrics,
  balanceSheetMetrics,
} from "@src/constants/Data/metricsData";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import {
  Ratio,
  Metric,
  HistoricalData,
  BalanceSheet,
  CashFlow,
  IncomeStatement,
  Overview,
  Report,
} from "@src/models/FinancialMetrics.interface";

const mapHistoricalData = (
  reports: Report[],
  metricKey: string,
): HistoricalData[] => {
  const years = [1, 3, 5, 7, 10];
  const historicalData = years.map((year) => {
    const currentYear = new Date().getFullYear();
    const report = reports.find((r) =>
      r.fiscalDateEnding.startsWith((currentYear - year).toString()),
    );

    return {
      date: report ? report.fiscalDateEnding : "N/A",
      value: report ? report[metricKey]?.toString() ?? "N/A" : "N/A",
    };
  });
  return historicalData;
};

const getMetrics = async (req: IReq<{ ticker?: string }>, res: IRes) => {
  try {
    const { ticker } = req.params;

    if (ticker) {
      const overview: Overview =
        await FinancialMetricsDataService.getOverviewByTicker({ ticker });
      const balanceSheet: BalanceSheet =
        await FinancialMetricsDataService.getBalanceSheetByTicker({ ticker });
      const cashFlow: CashFlow =
        await FinancialMetricsDataService.getCashFlowByTicker({ ticker });
      const incomeStatement: IncomeStatement =
        await FinancialMetricsDataService.getIncomeStatementByTicker({
          ticker,
        });

      // console.log("Overview data:", overview);

      const enrichedRatios: Ratio[] = ratios.map((ratio) => {
        const value = overview[ratio.key as keyof Overview];
        // console.log(`Key: ${ratio.key}, Value: ${value}`);
        return {
          ...ratio,
          historicalData: [
            {
              date: overview.LatestQuarter,
              value: value || "N/A",
            },
          ],
        };
      });

      const enrichedIncomeStatementMetrics: Metric[] =
        incomeStatementMetrics.map((metric) => ({
          ...metric,
          historicalData: mapHistoricalData(
            incomeStatement.annualReports,
            metric.key,
          ),
        }));

      const enrichedCashFlowMetrics: Metric[] = cashFlowMetrics.map(
        (metric) => ({
          ...metric,
          historicalData: mapHistoricalData(cashFlow.annualReports, metric.key),
        }),
      );

      const enrichedBalanceSheetMetrics: Metric[] = balanceSheetMetrics.map(
        (metric) => ({
          ...metric,
          historicalData: mapHistoricalData(
            balanceSheet.annualReports,
            metric.key,
          ),
        }),
      );

      return res.status(HttpStatusCodes.OK).json({
        symbol: ticker,
        ratios: enrichedRatios,
        incomeStatement: enrichedIncomeStatementMetrics,
        cashFlow: enrichedCashFlowMetrics,
        balanceSheet: enrichedBalanceSheetMetrics,
      });
    } else {
      // Return static data when no ticker is provided
      return res.status(HttpStatusCodes.OK).json({
        ratios,
        incomeStatement: incomeStatementMetrics,
        cashFlow: cashFlowMetrics,
        balanceSheet: balanceSheetMetrics,
      });
    }
  } catch (error) {
    // console.error("Error fetching metrics:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "An unknown error occurred",
    });
  }
};

export default { getMetrics } as const;

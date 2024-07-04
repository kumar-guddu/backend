import prisma from "@src/config/prismaClient";
import { CashFlowAnnual, CashFlowQuarterly } from "@prisma/client";
import formatNumberWithSuffix from "@src/util/numberFormatUtil";
import { Metric } from "@src/Database/interfaces/cashFlow";

class CashFlowService {
  /**
   * Retrieves cash flow based on the ticker and time series specified.
   * @param {ticker: string} - stock symbol to retrieve cash flows.
   * @param {timeSeries: string} - specifies whether data 
   * should be 'ANNUAL' or 'QUARTERLY'.
   * @returns {Promise<Metric[]>} - A promise resolving 
   * to an array of formatted metric objects.
   * @throws Will throw an error if the time series type is not recognized.
   */
  public async getCashFlowByTicker(
    ticker: string, 
    timeSeries: string): Promise<Metric[]> {
    let data: CashFlowAnnual[] | CashFlowQuarterly[];
    if (timeSeries === "ANNUAL") {
      data = await prisma.cashFlowAnnual.findMany({
        where: { symbol: ticker } });
    } else if (timeSeries === "QUARTER") {
      data = await prisma.cashFlowQuarterly.findMany({
        where: { symbol: ticker } });
    } else {
      throw new Error("Invalid time series type");
    }

    return this.formatCashFlowData(data, timeSeries);
  }

  /**
   * Formats raw cash flow data into structured metrics.
   * @param {data: Array} - Array of cash flow records (annual or quarterly).
   * @param {timeSeries: string} - Indicates if data is 
   * annual/quarterly for formatting.
   * @returns {Array} - An array of metrics with s
   * tructured data and formatted values.
   */
  private formatCashFlowData(
    data: CashFlowAnnual[] | CashFlowQuarterly[], 
    timeSeries: string): Metric[] {
    const metricsStructure: Metric[] = [
      {
        metric: "operatingCashflow",
        hasChildren: true,
        children: [
          { metric: "paymentsForOperatingActivities", 
            hasChildren: false, children: [] },
          { metric: "changeInOperatingLiabilities", 
            hasChildren: false, children: [] },
          { metric: "changeInOperatingAssets", 
            hasChildren: false, children: [] },
          { metric: "depreciationDepletionAndAmortization", 
            hasChildren: false, children: [] },
          { metric: "changeInReceivables", hasChildren: false, children: [] },
          { metric: "changeInInventory", hasChildren: false, children: [] },
          { metric: "profitLoss", hasChildren: false, children: [] },
        ],
      },
      { metric: "capitalExpenditures", hasChildren: false, children: [] },
      { metric: "cashflowFromInvestment", hasChildren: false, children: [] },
      {
        metric: "cashflowFromFinancing",
        hasChildren: true,
        children: [
          { metric: "proceedsFromRepaymentsOfShortTermDebt", 
            hasChildren: false, children: [] },
          {
            metric: "dividendPayout",
            hasChildren: true,
            children: [
              { metric: "dividendPayoutCommonStock", 
                hasChildren: false, children: [] },
            ],
          },
          { metric: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecurities", 
            hasChildren: false, children: [] },
          { metric: "proceedsFromRepurchaseOfEquity", 
            hasChildren: false, children: [] },
        ],
      },
      { metric: "netIncome", hasChildren: false, children: [] },
    ];

    return metricsStructure.map(
      metric => this.buildMetricData(metric, data, timeSeries));
  }

  /**
   * Recursively builds metric data for a given metric 
   * structure and financial data.
   * @param {metric: Metric} - The metric structure to be built.
   * @param {data: CashFlowAnnual[] | CashFlowQuarterly[]} - The financial data.
   * @param {timeSeries: string} - Indicates if 
   * data is annual/quarterly for formatting.
   * @returns {Metric} - The metric with structured data.
   */
  private buildMetricData(
    metric: Metric, data: CashFlowAnnual[] | CashFlowQuarterly[], 
    timeSeries: string): Metric {
    const metricData: Record<string, string> = {};

    data.forEach(record => {
      const dateKey = this.formatDateKey(record.fiscalDateEnding, timeSeries);
      metricData[dateKey] = 
      record[metric.metric] ? formatNumberWithSuffix(
        record[metric.metric] as number) : "N/A";
    });

    const children = 
    metric.children.map(child => this.buildMetricData(child, data, timeSeries));

    return {
      ...metric,
      data: Object.keys(metricData).length ? metricData : undefined,
      children,
    };
  }

  /**
   * Formats the fiscal date ending into a readable string format.
   * @param {date: Date} - The fiscal date ending.
   * @param {timeSeries: string} - Indicates if data 
   * is annual/quarterly for formatting.
   * @returns {string} - The formatted date key.
   */
  private formatDateKey(date: Date, timeSeries: string): string {
    if (timeSeries === "ANNUAL") {
      return date.toLocaleDateString("en-US", { year: "numeric" });
    } else {
      return date.toLocaleDateString("en-US", 
        { year: "numeric", month: "short" });
    }
  }
}

export const cashFlowService = new CashFlowService();

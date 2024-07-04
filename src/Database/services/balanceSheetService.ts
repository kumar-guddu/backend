import prisma from "@src/config/prismaClient";
import { BalanceSheetAnnual, BalanceSheetQuarterly } from "@prisma/client";
import formatNumberWithSuffix from "@src/util/numberFormatUtil";
import { Metric } from "@src/Database/interfaces/balanceSheet";

class BalanceSheetService {

  public async getBalanceSheetByTicker(
    ticker: string, 
    timeSeries: string): Promise<Metric[]> {
    let data: BalanceSheetAnnual[] | BalanceSheetQuarterly[];
    if (timeSeries === "ANNUAL") {
      data = 
        await prisma.balanceSheetAnnual.findMany({ where: { symbol: ticker } });
    } else if (timeSeries === "QUARTER") {
      data = 
       await prisma.balanceSheetQuarterly.findMany({
         where: { symbol: ticker } });
    } else {
      throw new Error("Invalid time series type");
    }

    return this.formatFinancialData(data, timeSeries);
  }

  private formatFinancialData(
    data: BalanceSheetAnnual[] | BalanceSheetQuarterly[], 
    timeSeries: string): Metric[] {
    const metricsStructure: Metric[] = [
      {
        metric: "totalAssets",
        hasChildren: true,
        children: [
          {
            metric: "totalCurrentAssets",
            hasChildren: true,
            children: [
              { metric: "cashAndCashEquivalentsAtCarryingValue", 
                hasChildren: false, children: [] },
              { metric: "cashAndShortTermInvestments", 
                hasChildren: false, children: [] },
              { metric: "inventory", hasChildren: false, children: [] },
              { metric: "currentNetReceivables", 
                hasChildren: false, children: [] },
              { metric: "otherCurrentAssets", 
                hasChildren: false, children: [] },
            ],
          },
          {
            metric: "totalNonCurrentAssets",
            hasChildren: true,
            children: [
              {
                metric: "propertyPlantEquipment",
                hasChildren: true,
                children: [
                  { metric: "accumulatedDepreciationAmortizationPPE", 
                    hasChildren: false, children: [] },
                ],
              },
              {
                metric: "intangibleAssets",
                hasChildren: true,
                children: [
                  { metric: "intangibleAssetsExcludingGoodwill", 
                    hasChildren: false, children: [] },
                  { metric: "goodwill", hasChildren: false, children: [] },
                ],
              },
              { metric: "longTermInvestments", 
                hasChildren: false, children: [] },
              { metric: "shortTermInvestments", 
                hasChildren: false, children: [] },
            ],
          },
        ],
      },
      {
        metric: "totalLiabilities",
        hasChildren: true,
        children: [
          {
            metric: "totalCurrentLiabilities",
            hasChildren: true,
            children: [
              { metric: "currentAccountsPayable",
                hasChildren: false, children: [] },
              { metric: "deferredRevenue", hasChildren: false, children: [] },
              {
                metric: "currentDebt",
                hasChildren: true,
                children: [
                  { metric: "shortTermDebt", hasChildren: false, children: [] },
                ],
              },
              { metric: "otherCurrentLiabilities",
                hasChildren: false, children: [] },
            ],
          },
          {
            metric: "totalNonCurrentLiabilities",
            hasChildren: true,
            children: [
              { metric: "capitalLeaseObligations",
                hasChildren: false, children: [] },
              {
                metric: "longTermDebt",
                hasChildren: true,
                children: [
                  { metric: "currentLongTermDebt",
                    hasChildren: false, children: [] },
                  { metric: "longTermDebtNoncurrent",
                    hasChildren: false, children: [] },
                ],
              },
              { metric: "otherNonCurrentLiabilities",
                hasChildren: false, children: [] },
            ],
          },
        ],
      },
      {
        metric: "totalShareholderEquity",
        hasChildren: true,
        children: [
          { metric: "treasuryStock", hasChildren: false, children: [] },
          { metric: "retainedEarnings", hasChildren: false, children: [] },
          {
            metric: "commonStock",
            hasChildren: true,
            children: [
              { metric: "commonStockSharesOutstanding",
                hasChildren: false, children: [] },
            ],
          },
        ],
      },
    ];

    return metricsStructure.map(
      metric => this.buildMetricData(metric, data, timeSeries));
  }

  private buildMetricData(
    metric: Metric, 
    data: BalanceSheetAnnual[] | BalanceSheetQuarterly[], 
    timeSeries: string): Metric {
    const metricData: Record<string, string> = {};

    data.forEach(record => {
      const dateKey = this.formatDateKey(record.fiscalDateEnding, timeSeries);
      metricData[dateKey] = 
        record[metric.metric] ? formatNumberWithSuffix(
          record[metric.metric] as number) : "N/A";
    });

    const children = 
      metric.children.map(child => 
        this.buildMetricData(child, data, timeSeries));

    return {
      ...metric,
      data: Object.keys(metricData).length ? metricData : undefined,
      children,
    };
  }

  private formatDateKey(date: Date, timeSeries: string): string {
    if (timeSeries === "ANNUAL") {
      return date.toLocaleDateString("en-US", { year: "numeric" });
    } else {
      return date.toLocaleDateString("en-US", 
        { year: "numeric", month: "short" });
    }
  }
}

export const balanceSheetService = new BalanceSheetService();

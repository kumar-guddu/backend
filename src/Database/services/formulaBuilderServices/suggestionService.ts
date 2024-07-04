import prisma from "@src/config/prismaClient";

export class SuggestionService {
  private isNumberType(value: unknown): boolean {
    return typeof value === "number";
  }

  private async fetchFirstRecord<T>(model: T):
   Promise<Record<string, unknown> | null> {
    const record = await (model as unknown as { findFirst: () =>
       Promise<Record<string, unknown> | null> }).findFirst();
    return record;
  }

  public async getSuggestions(searchTerm: string) {
    // Fetch all available metrics from financial tables
    const incomeStatementRecord =
      await this.fetchFirstRecord(prisma.incomeStatementAnnual);
    const balanceSheetRecord =
     await this.fetchFirstRecord(prisma.balanceSheetAnnual);
    const cashFlowRecord =
     await this.fetchFirstRecord(prisma.cashFlowAnnual);
    const stockDataRecord =
     await this.fetchFirstRecord(prisma.stockData);

    // Get keys from each record if it exists and filter by number type
    const incomeMetrics = incomeStatementRecord
      ? Object.keys(incomeStatementRecord).filter(key =>
        this.isNumberType(incomeStatementRecord[key]))
      : [];
    const balanceSheetMetrics = balanceSheetRecord
      ? Object.keys(balanceSheetRecord).filter(key =>
        this.isNumberType(balanceSheetRecord[key]))
      : [];
    const cashFlowMetrics = cashFlowRecord
      ? Object.keys(cashFlowRecord).filter(key => 
        this.isNumberType(cashFlowRecord[key]))
      : [];
    const stockMetrics = stockDataRecord
      ? Object.keys(stockDataRecord).filter(key => 
        this.isNumberType(stockDataRecord[key]) && 
        (key === "close" || key === "volume"))
      : [];

    // Map the stock metrics to the desired display format
    const mappedStockMetrics = stockMetrics.map(metric => {
      if (metric === "close") {
        return "Share Price Close";
      }
      return metric;
    });

    // Fetch all available ratios
    const ratios = await prisma.ratio.findMany({
      select: {
        name: true,
      },
    });

    // Combine all metrics and ratios
    const allMetrics = [
      ...incomeMetrics,
      ...balanceSheetMetrics,
      ...cashFlowMetrics,
      ...mappedStockMetrics,
    ];

    const filteredMetrics = allMetrics.filter(metric =>
      metric.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );
    const filteredRatios = ratios.map(ratio => ratio.name).filter(ratio =>
      ratio.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );

    return {
      metrics: filteredMetrics,
      ratios: filteredRatios,
    };
  }
}

export const suggestionService = new SuggestionService();

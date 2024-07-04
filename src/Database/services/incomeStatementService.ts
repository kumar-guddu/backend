import prisma from "@src/config/prismaClient";
import { IncomeStatementAnnual, IncomeStatementQuarterly } 
  from "@prisma/client";
import formatNumberWithSuffix from "@src/util/numberFormatUtil";
import { Metric, metrics } from "@src/Database/interfaces/incomeStatement";

/**
 * Service to handle income statement data retrieval and formatting.
 */
class IncomeStatementService {
  /**
   * Retrieves income statement based on the ticker and time series specified.
   * @param ticker - The stock symbol for which to retrieve income statements.
   * @param timeSeries - Specifies whether the data be 'ANNUAL' or 'QUARTER'.
   * @returns A promise resolving to an array of formatted metric objects.
   * @throws Will throw an error if the time series type is not recognized.
   */
  public async getIncomeStatementByTicker(
    ticker: string, 
    timeSeries: string): Promise<Metric[]> {
    let data: IncomeStatementAnnual[] | IncomeStatementQuarterly[];
    if (timeSeries === "ANNUAL") {
      data = 
        await prisma.incomeStatementAnnual.findMany(
          { where: 
                  { symbol: ticker },
          });
    } else if (timeSeries === "QUARTER") {
      data = 
        await prisma.incomeStatementQuarterly.findMany(
          { where: 
                  { symbol: ticker },
          });
    } else {
      throw new Error("Invalid time series type");
    }

    return this.formatFinancialData(data, timeSeries);
  }

  /**
   * Formats raw financial data into structured metrics.
   * @param data - Array of financial statement records (annual or quarterly).
   * @param timeSeries - Indicates if data is annual/quarterly for formatting.
   * @returns An array of metrics with structured data with formatted values.
   */
  private formatFinancialData(
    data: IncomeStatementAnnual[] | IncomeStatementQuarterly[], 
    timeSeries: string): Metric[] {
    const response = metrics.map(metric => {
      const metricData = data.map(d => {
        const date = timeSeries === "ANNUAL"
          ? d.fiscalDateEnding.toLocaleDateString("en-US", { year: "numeric" })
          : d.fiscalDateEnding.toLocaleDateString("en-US", 
            { year: "numeric", month: "short" });
        
        const value = d[metric.metric as keyof typeof d];  
        return { date, value: formatNumberWithSuffix(value as number) };  
      });

      // Aggregate date and value pairs into an object for each metric.
      const dataObject = metricData.reduce((acc, { date, value }) => {
        acc[date] = value;
        return acc;
      }, {} as Record<string, string>);

      return {
        ...metric,
        data: dataObject,
      };
    });

    return response;
  }
}

export const incomeStatementService = new IncomeStatementService();

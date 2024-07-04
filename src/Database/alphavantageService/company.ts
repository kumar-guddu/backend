// import GraphServices from "@src/services/GraphServices";
// //import CompanyServices from '@src/Database/services/companies';
// import {
//   IChange,
//   ICompanyData,
//   IRangeDataPoint,
//   IWatchListData,
// } from "../interfaces/watchlist";
// import { parseTimeSeriesData } from "@src/controllers/GraphController";
// import { Interval, TimeFrame } from "@src/models/DailyStockData.interface";

// function calculateChange(array: number[]): IChange {
//   const first = array?.[0];
//   const last = array?.[array.length - 1];
//   return { amount: ((last - first) * 100) / first, type: last > first ? 1 : 0 };
// }

// function convertTimeSeriesGraphToCompany(
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   timeSeriesGraph: any,
// ): IRangeDataPoint {
//   const metric = "stockPrice";
//   const type = "range";

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const value =
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     timeSeriesGraph
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       ?.TIME_SERIES_DATA?.map(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (dataPoint: any) => {
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//           return Number(dataPoint.open);
//         });
//   const change = calculateChange(value as number[]);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   return { change, metric, type, value };
// }

// // Update function signature to include timeFrame
// async function getCompanyDetail(
//   ticker: string,
//   timeFrame: TimeFrame): Promise<ICompanyData> {
//   try {
//     // Use the timeFrame parameter when calling the GraphServices
//     const graphRes = await GraphServices.getTimeSeriesByTicker({
//       ticker,
//       timeFrame, // use the timeFrame parameter
//       interval: timeFrame ===
//         TimeFrame.Intraday ? Interval.FiveMinutes : undefined,
//     });
//     const stockPriceData = parseTimeSeriesData(graphRes);
//     const companyData = convertTimeSeriesGraphToCompany(stockPriceData);
//     return {
//       company: ticker,
//       metrices: [companyData],
//     };
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred",
//     );
//   }
// }

// async function getWatchListCompaniesData(
//   companies: string[],
//   timeFrame: TimeFrame): Promise<IWatchListData["data"]> {
//   try {
//     const companyDetails = await Promise.all(
//       companies.map(company =>
//         getCompanyDetail(company, timeFrame)),
//     );
//     return companyDetails;
//   } catch (error) {
//     throw new Error(
//       error instanceof Error ? error.message : "An unknown error occurred",
//     );
//   }
// }

// export default { getWatchListCompaniesData } as const;

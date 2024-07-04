import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
// import LatestBalanceSheetSummaryService 
//   from "@src/services/LatestBalanceSheetSummaryService";
// import LatestIncomeStatementSummaryService 
//   from "@src/services/LatestIncomeStatementSummaryService";
// import LatestCashFlowSummaryService 
//   from "@src/services/LatestCashFlowSummaryService";
// import DailyStockDataService from "@src/services/DailyStockDataService";
import {
  ILatestCashFlowReport,
  ILatestIncomeStatementReport,
  ILatestBalanceSheetReport,
} from "@src/routes/LatestDataSummaryRoutes/LatestDataSummary.interface";
import daily_price from "@src/routes/LatestDataSummaryRoutes/daily_prices.json";
import balanceSheetData from "@src/constants/balanceSheet.json";
import incomeStatementData from "@src/constants/incomeStatement.json";
import cashFlowData from "@src/constants/cashFlow.json";
import companyOverviewData from "@src/constants/companyOverview.json";

import { BalanceSheet } from "@src/models/BalanceSheet.interface";
import { CashFlow } from "@src/models/CashFlow.interface";
import { IncomeStatement } from "@src/models/IncomeStatement.interface";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  //MetaData,
  //TimeSeriesData,
  //TimeSeries,
  DailyStockData,
}
  from "@src/models/DailyStockData.interface"; 
import { Valuation } from "@src/models/Valuation.inteface";
import { Profitability } from "@src/models/Profitability.interface";
import { Description } from "@src/models/Description.interface";
import { CapitalStructure } from "@src/models/CapitalStructure.interface";
import CompanyOverview from "@src/models/CompanyOverview.interface";
import formatNumberWithSuffix from "@src/util/numberFormatUtil";

function _Valuation(companyOverview: CompanyOverview): Valuation {
  const trailingPE: string = parseFloat(companyOverview.TrailingPE).toFixed(2);
  const forwardPE: string = parseFloat(companyOverview.ForwardPE).toFixed(2);
  const priceToSalesRatio: string = parseFloat(
    companyOverview.PriceToSalesRatioTTM,
  ).toFixed(2);
  const priceToBookRatio: string = parseFloat(
    companyOverview.PriceToBookRatio,
  ).toFixed(2);
  const enterpriseValueToRevenueRatio: string = parseFloat(
    companyOverview.EVToRevenue,
  ).toFixed(2);
  const enterpriseValueToEbitdaRatio: string = parseFloat(
    companyOverview.EVToEBITDA,
  ).toFixed(2);

  const valuation: Valuation = {
    trailingPE,
    forwardPE,
    priceToSalesRatio,
    priceToBookRatio,
    enterpriseValueToRevenueRatio,
    enterpriseValueToEbitdaRatio,
  };

  return valuation;
}

function _Profitability(
  dailyStockData: DailyStockData,
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
  //cashFlow: CashFlow,
  //companyOverview: companyOverviewData,
): Profitability {
  const totalRevenue: number = parseInt(
    incomeStatement.quarterlyReports[0]["totalRevenue"],
  );
  const costOfRevenue: number = parseInt(
    incomeStatement.quarterlyReports[0]["costOfRevenue"],
  );
  const grossProfit: number = totalRevenue - costOfRevenue;
  const netIncome: number = parseInt(
    incomeStatement.quarterlyReports[0]["netIncome"],
  );
  const operatingIncome: number = parseInt(
    incomeStatement.quarterlyReports[0]["operatingIncome"],
  );
  const totalAssets: number = parseInt(
    balanceSheet.quarterlyReports[0]["totalAssets"],
  );
  const stakeHolderEquity: number = parseInt(
    balanceSheet.quarterlyReports[0]["totalShareholderEquity"],
  );
  const ebitda: number = parseInt(
    incomeStatement.quarterlyReports[0]["ebitda"],
  );

  const grossProfitMargin = ((grossProfit / totalRevenue) * 100)
    .toFixed(2)
    .toString();
  const operatingMargin = ((operatingIncome / totalRevenue) * 100)
    .toFixed(2)
    .toString();
  const ebitMargin = ((ebitda / totalRevenue) * 100).toFixed(2).toString();
  const returnOnEquity = ((netIncome / stakeHolderEquity) * 100)
    .toFixed(2)
    .toString();
  const returnOnAssets = ((netIncome / totalAssets) * 100)
    .toFixed(2)
    .toString();

  const profitability: Profitability = {
    grossProfitMargin,
    operatingMargin,
    ebitMargin,
    returnOnEquity,
    returnOnAssets,
  };
  return profitability;
}

function _CapitalStructure(
  dailyStockData: DailyStockData,
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
  cashFlow: CashFlow,
  companyOverview: CompanyOverview,
): CapitalStructure {
  //const timeSeriesDaily:TimeSeries= dailyStockData['Time Series (Daily)'];
  //const latestDate = Object.keys(timeSeriesDaily)[0];
  //const firstobj:TimeSeriesData= timeSeriesDaily[latestDate];
  //const latestClosingStockPrice:number = parseInt(firstobj['4. close']);
  const ebidta: number = parseFloat(companyOverview.EBITDA);
  const enterpriseValueToEbitdaRatio: number = parseFloat(
    companyOverview.EVToEBITDA,
  );
  const shortTermDebt: number = parseFloat(
    balanceSheet.quarterlyReports[0]["shortTermDebt"],
  );
  const longTermDebt: number = parseFloat(
    balanceSheet.quarterlyReports[0]["longTermDebt"],
  );
  const totalCurrentLiabilities: number = parseFloat(
    balanceSheet.quarterlyReports[0]["totalCurrentLiabilities"],
  );

  const cashAndCashEquivalents = parseInt(
    balanceSheet.quarterlyReports[0]["cashAndCashEquivalentsAtCarryingValue"],
  );

  const marketCap: string =
    "$" +
    formatNumberWithSuffix(parseFloat(companyOverview.MarketCapitalization));
  const totalDebt: string =
    "$" +
    formatNumberWithSuffix(
      shortTermDebt + longTermDebt + totalCurrentLiabilities,
    );
  const cashRatio: string = (cashAndCashEquivalents / totalCurrentLiabilities)
    .toFixed(2)
    .toString();
  const other: string = "-";
  const enterpriseValue: string =
    "$" + formatNumberWithSuffix(ebidta / enterpriseValueToEbitdaRatio);

  const capitalStructure = {
    marketCap,
    totalDebt,
    cashRatio,
    other,
    enterpriseValue,
  };
  return capitalStructure;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function IncomeStatementSummary(
  dailyStockData: DailyStockData,
  incomeStatement: IncomeStatement,
  //balanceSheet: BalanceSheet,
  //cashFlow: CashFlowData,
  //companyOverview: CompanyOverviewData,
): ILatestIncomeStatementReport {
  const totalRevenue: number = parseInt(
    incomeStatement.quarterlyReports[0]["totalRevenue"],
  );
  const costOfRevenue: number = parseInt(
    incomeStatement.quarterlyReports[0]["costOfRevenue"],
  );
  const totalShare: number = parseInt(
    incomeStatement.quarterlyReports[0]["totalShareholderEquity"],
  );
  //const NetIncome=incomeStatement.quarterlyReports[0]['netIncome'];

  const revenue = "$" + formatNumberWithSuffix(totalRevenue); //Doubt
  const revenuePerShare =
    "$" + (totalRevenue / totalShare).toFixed(2).toString();

  const epsDiluted = "//"; //Doubt
  const grossProfit =
    "$" + formatNumberWithSuffix(totalRevenue - costOfRevenue);
  const ebidta =
    "$" +
    formatNumberWithSuffix(
      parseFloat(incomeStatement.quarterlyReports[0]["ebitda"]),
    );
  const netIncome =
    "$" +
    formatNumberWithSuffix(
      parseFloat(incomeStatement.quarterlyReports[0]["netIncome"]),
    );

  const incomeStatementSummary: ILatestIncomeStatementReport = {
    revenue,
    revenuePerShare,
    grossProfit,
    ebidta,
    netIncome,
    epsDiluted,
  };

  return incomeStatementSummary;
}

//doubt in 2 Formulas
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BalanceSheetSummary(
  dailyStockData: DailyStockData,
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
  //cashFlow: CashFlow,
  //companyOverview: CompanyOverview
): ILatestBalanceSheetReport {
  const shortTermDebt: number = parseFloat(
    balanceSheet.quarterlyReports[0]["shortTermDebt"],
  );
  const longTermDebt: number = parseFloat(
    balanceSheet.quarterlyReports[0]["longTermDebt"],
  );
  const totalCurrentLiabilities: number = parseFloat(
    balanceSheet.quarterlyReports[0]["totalCurrentLiabilities"],
  );
  const totalCurrentAssets: number = parseFloat(
    balanceSheet.quarterlyReports[0]["totalCurrentAssets"],
  );
  const inventory: number = parseFloat(
    balanceSheet.quarterlyReports[0]["inventory"],
  );
  const totalShareholderEquity: number = parseFloat(
    balanceSheet.quarterlyReports[0]["totalShareholderEquity"],
  );
  const cashAndCashEquivalentsAtCarryingValue: number = parseFloat(
    balanceSheet.quarterlyReports[0]["cashAndCashEquivalentsAtCarryingValue"],
  );

  const totalCash = formatNumberWithSuffix(
    cashAndCashEquivalentsAtCarryingValue,
  ); // ?
  const totalCashPerShare = (
    cashAndCashEquivalentsAtCarryingValue / totalCurrentLiabilities
  )
    .toFixed(2)
    .toString(); // Number of shares?
  const totalDebtToEquity = (
    (shortTermDebt + longTermDebt + totalCurrentLiabilities) /
    totalShareholderEquity
  )
    .toFixed(2)
    .toString(); // Equity?
  const totalDebt: string =
    "$" +
    formatNumberWithSuffix(
      shortTermDebt + longTermDebt + totalCurrentLiabilities,
    );
  const currentRatio = (totalCurrentAssets / totalCurrentLiabilities)
    .toFixed(2)
    .toString();
  const quickRatio = (
    (totalCurrentAssets - inventory) /
    totalCurrentLiabilities
  )
    .toFixed(2)
    .toString();

  const balanceSheetSummary: ILatestBalanceSheetReport = {
    totalCash,
    totalCashPerShare,
    totalDebt,
    totalDebtToEquity,
    currentRatio,
    quickRatio,
  };
  return balanceSheetSummary;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CashFlowSummary(
  dailyStockData: DailyStockData,
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
  cashFlow: CashFlow,
  //companyOverview: CompanyOverview
): ILatestCashFlowReport {
  const cashflowFromInvestment: number = parseInt(
    cashFlow.quarterlyReports[0]["cashflowFromInvestment"],
  );
  const operatingCashflow: number = parseInt(
    cashFlow.quarterlyReports[0]["operatingCashflow"],
  );
  const capitalExpenditures: number = parseInt(
    cashFlow.quarterlyReports[0]["capitalExpenditures"],
  );
  const debtRepayments: number = parseInt(
    cashFlow.quarterlyReports[0]["proceedsFromRepaymentsOfShortTermDebt"],
  );

  //Confirmation Required
  const cashFromOperations = "$" + formatNumberWithSuffix(operatingCashflow); 
  const cashFromInvesting =
  //Confirmation Required
    "$" + formatNumberWithSuffix(cashflowFromInvestment);
  const leveredFreeCashFlow =
    "$" +
    formatNumberWithSuffix(
      operatingCashflow - capitalExpenditures - debtRepayments,
    );
  const unLeveredFreeCashFlow =
    "$" + formatNumberWithSuffix(operatingCashflow - capitalExpenditures);
  const freeCashFlowPerShare = "//"; //doubt

  const cashFlowSummary: ILatestCashFlowReport = {
    cashFromOperations,
    cashFromInvesting,
    leveredFreeCashFlow,
    unLeveredFreeCashFlow,
    freeCashFlowPerShare,
  };
  return cashFlowSummary;
}
function getDescription(companyData: CompanyOverview): Description {
  const companydescription = companyData.Description;

  const description: Description = {
    companydescription,
  };

  return description;
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getLatestDataSummaryByTicker(
  req: IReq<{ ticker: string }>,
  res: IRes,
) {
  try {
    // const { ticker } = req.params;
    // const LatestDataSummaryParams = {
    //  ticker,
    // };
    // const balanceSheet = 
    //    await LatestBalanceSheetSummaryService
    //     .getLatestBalanceSheetSummaryByTicker(LatestDataSummaryParams);
    // const incomeStatement =
    //     await LatestIncomeStatementSummaryService
    //      .getLatestIncomeStatementSummaryByTicker(LatestDataSummaryParams);
    // const cashFlow =
    //     await LatestCashFlowSummaryService
    //       .getLatestCashFlowSummaryByTicker(LatestDataSummaryParams);
    // const dailyStockData =
    //     await DailyStockDataService
    //      .getCurrentStockPriceByTicker(LatestDataSummaryParams);
    // const companyOverview = await

    const dailyStockData: DailyStockData = daily_price;

    const valuation: Valuation = _Valuation(companyOverviewData);
    const profitability: Profitability = _Profitability(
      dailyStockData,
      incomeStatementData,
      balanceSheetData,
      //cashFlowData,
      //companyOverviewData,
    );
    const capitalStructure: CapitalStructure = _CapitalStructure(
      dailyStockData,
      incomeStatementData,
      balanceSheetData,
      cashFlowData,
      companyOverviewData,
    );
    const incomeStatementSummary: ILatestIncomeStatementReport =
      IncomeStatementSummary(
        dailyStockData,
        incomeStatementData,
        //balanceSheetData,
        //cashFlowData,
        //companyOverviewData,
      );
    const balanceSheetSummary: ILatestBalanceSheetReport = BalanceSheetSummary(
      dailyStockData,
      incomeStatementData,
      balanceSheetData,
      //cashFlowData,
      //companyOverviewData,
    );
    const cashFlowSummary: ILatestCashFlowReport = CashFlowSummary(
      dailyStockData,
      incomeStatementData,
      balanceSheetData,
      cashFlowData,
      //companyOverviewData,
    );
    const description: Description = getDescription(companyOverviewData);
    const sector=companyOverviewData.Sector;
    const industry=companyOverviewData.Industry;

    const response = {
      valuation: valuation,
      profitability: profitability,
      capitalStructure: capitalStructure,
      incomeStatement: incomeStatementSummary,
      balanceSheet: balanceSheetSummary,
      cashFlow: cashFlowSummary,
      description: description,
      sector:sector,
      industry:industry,
    };

    return res.status(HttpStatusCodes.OK).json(response);
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
export default { getLatestDataSummaryByTicker } as const;

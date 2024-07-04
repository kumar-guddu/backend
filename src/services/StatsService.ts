import {
  ValuationRatios,
  ProfitabilityRatios,
  LiquidityRatios,
} from "@src/models/Stats.interface";
import { IncomeStatement } from "@src/models/IncomeStatement.interface";
import { BalanceSheet } from "@src/models/BalanceSheet.interface";


type Data = Record<string, string>;
type Metric = {
  metric: string;
  hasChildren: boolean;
  children: Metric[];
  data?: Data;
};

const metricsProfitability: Metric[] = [
  { metric: "returnOnAssets", hasChildren: false, children: [] },
  { metric: "returnOnEquity", hasChildren: false, children: [] },
  { metric: "grossMargin", hasChildren: false, children: [] },
  { metric: "operatingMargin", hasChildren: false, children: [] },
  { metric: "ebitdaMargin", hasChildren: false, children: [] },
  { metric: "netMargin", hasChildren: false, children: [] },
];

const metricsLiquidity: Metric[] = [
  { metric: "quickRatio", hasChildren: false, children: [] },
  { metric: "currentRatio", hasChildren: false, children: [] },
  { metric: "inventoryTurnover", hasChildren: false, children: [] },
  { metric: "assetTurnover", hasChildren: false, children: [] },
  { metric: "debtToAssetRatio", hasChildren: false, children: [] },
  { metric: "debtToEquityRatio", hasChildren: false, children: [] },
  {
    metric: "longTermDebtToTotalAssetsRatio",
    hasChildren: false,
    children: [],
  },
  {
    metric: "longTermDebtToTotalEquityRatio",
    hasChildren: false,
    children: [],
  },
];

const metricsValuation: Metric[] = [
  { metric: "priceToEarningsRatio", hasChildren: false, children: [] },
  { metric: "priceToSalesRatio", hasChildren: false, children: [] },
  { metric: "priceToCashFlowRatio", hasChildren: false, children: [] },
  { metric: "enterpriseRatio", hasChildren: false, children: [] },
  { metric: "enterpriseValueToEbitdaRatio", hasChildren: false, children: [] },
];

function _quarterlyValuationRatios(): ValuationRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "priceToEarningsRatio",
    "priceToSalesRatio",
    "priceToCashFlowRatio",
    "priceToBookRatio",
    "enterpriseRatio",
    "enterpriseValueToEbitdaRatio",
  ];

  const valuationRatios: ValuationRatios[] = metrics.map((metric) => {
    const data: Record<string, string> = {};
    data["metric"] = metric;
    years.forEach((year) => {
      data[year] = "//";
    });
    return data as ValuationRatios;
  });

  return valuationRatios;
}

function _quarterlyProfitabilityRatios(
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
): ProfitabilityRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "returnOnAssets",
    "returnOnEquity",
    "returnOnInvestedCapital",
    "grossMargin",
    "operatingMargin",
    "ebitdaMargin",
    "netMargin",
  ];

  const decemberIncomeReports: IncomeStatement["quarterlyReports"] = [];
  const yearsSet: Set<string> = new Set();

  for (const report of incomeStatement.quarterlyReports) {
    const year = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet.has(year)) {
      yearsSet.add(year);
      decemberIncomeReports.push(report);
    }
  }

  const decemberBalanceReports: BalanceSheet["quarterlyReports"] = [];
  const yearsSet1: Set<string> = new Set();

  for (const report of balanceSheet.quarterlyReports) {
    const year = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet1.has(year)) {
      yearsSet1.add(year);
      decemberBalanceReports.push(report);
    }
  }

  const marchBalanceReports: BalanceSheet["quarterlyReports"] = [];
  const yearsSet2: Set<string> = new Set();

  for (let i = balanceSheet.quarterlyReports.length - 1; i >= 0; i--) {
    const report = balanceSheet.quarterlyReports[i];
    const year = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet2.has(year)) {
      yearsSet2.add(year);
      marchBalanceReports.push(report);
    }
  }

  const profitabilityRatios: ProfitabilityRatios[] = metrics.map((metric) => {
    const data: Partial<ProfitabilityRatios> = { metric };

    years.forEach((year) => {
      const incomeReport = decemberIncomeReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const balanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const marchbalanceReport = marchBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );

      if (incomeReport && balanceReport && marchbalanceReport) {
        const totalRevenue = parseInt(incomeReport.totalRevenue);
        const costOfRevenue = parseInt(incomeReport.costOfRevenue);
        const grossProfit = totalRevenue - costOfRevenue;
        const netIncome = parseInt(incomeReport.netIncome);
        const operatingIncome = parseInt(incomeReport.operatingIncome);
        const totalAssets = parseInt(balanceReport.totalAssets);
        const stakeHolderEquity = parseInt(
          balanceReport.totalShareholderEquity,
        );
        const ebitda = parseInt(incomeReport.ebitda);
        const totalLiabilitiesDecember = parseInt(
          balanceReport.totalLiabilities,
        );
        const totalLiabilitiesMarch = parseInt(
          marchbalanceReport.totalLiabilities,
        );
        const stakeHolderEquityMarch = parseInt(
          marchbalanceReport.totalShareholderEquity,
        );

        const totalInvestedCapitalatMarch =
          totalLiabilitiesMarch + stakeHolderEquityMarch;
        const totalInvestedCapitalatend =
          totalLiabilitiesDecember + stakeHolderEquity;
        const avgtotalInvestedCapital =
          (totalInvestedCapitalatMarch + totalInvestedCapitalatend) / 2;

        if (metric === "returnOnAssets") {
          data[year] = ((netIncome / totalAssets) * 100).toFixed(2);
        } else if (metric === "returnOnEquity") {
          data[year] = ((netIncome / stakeHolderEquity) * 100).toFixed(2);
        } else if (metric === "returnOnInvestedCapital") {
          data[year] = ((netIncome / avgtotalInvestedCapital) * 100).toFixed(2);
        } else if (metric === "grossMargin") {
          data[year] = ((grossProfit / totalRevenue) * 100).toFixed(2);
        } else if (metric === "operatingMargin") {
          data[year] = ((operatingIncome / totalRevenue) * 100).toFixed(2);
        } else if (metric === "ebitdaMargin") {
          data[year] = ((ebitda / totalRevenue) * 100).toFixed(2);
        } else if (metric === "netMargin") {
          data[year] = ((netIncome / totalRevenue) * 100).toFixed(2);
        }
      }
    });
    return data as ProfitabilityRatios;
  });

  return profitabilityRatios;
}

function _quarterlyLiquidityRatios(
  balanceSheet: BalanceSheet,
  incomeStatement: IncomeStatement,
): LiquidityRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "quickRatio",
    "currentRatio",
    "inventoryTurnover",
    "assetTurnover",
    "debtToAssetRatio",
    "debtToEquityRatio",
    "longTermDebtToTotalAssetsRatio",
    "longTermDebtToTotalEquityRatio",
  ];

  const decemberIncomeReports: IncomeStatement["quarterlyReports"] = [];
  const yearsSet: Set<string> = new Set();

  for (const report of incomeStatement.quarterlyReports) {
    const yearofdata = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet.has(yearofdata)) {
      yearsSet.add(yearofdata);
      decemberIncomeReports.push(report);
    }
  }

  const decemberBalanceReports: BalanceSheet["quarterlyReports"] = [];
  const yearsSet1: Set<string> = new Set();

  for (const report of balanceSheet.quarterlyReports) {
    const yearofdata = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet1.has(yearofdata)) {
      yearsSet1.add(yearofdata);
      decemberBalanceReports.push(report);
    }
  }

  const marchBalanceReports: BalanceSheet["quarterlyReports"] = [];
  const yearsSet2: Set<string> = new Set();

  for (let i = balanceSheet.quarterlyReports.length - 1; i >= 0; i--) {
    const report = balanceSheet.quarterlyReports[i];
    const year = report.fiscalDateEnding.split("-")[0];
    if (!yearsSet2.has(year)) {
      yearsSet2.add(year);
      marchBalanceReports.push(report);
    }
  }

  const liquidityRatios: LiquidityRatios[] = metrics.map((metric) => {
    const data: Partial<LiquidityRatios> = { metric };
    data["metric"] = metric;
    years.forEach((year) => {
      const incomeReport = decemberIncomeReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const balanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const balanceReportMarch = marchBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );

      if (balanceReport && incomeReport && balanceReportMarch) {
        const longTermDebt: number = parseFloat(balanceReport.longTermDebt);
        const totalCurrentLiabilities: number = parseFloat(
          balanceReport.totalCurrentLiabilities,
        );
        const totalCurrentAssets: number = parseFloat(
          balanceReport.totalCurrentAssets,
        );
        const inventory: number = parseFloat(balanceReport.inventory);
        const totalShareholderEquity: number = parseFloat(
          balanceReport.totalShareholderEquity,
        );
        const costOfRevenue: number = parseFloat(incomeReport.costOfRevenue);
        const totalRevenue: number = parseFloat(incomeReport.totalRevenue);
        const totalAssetsAtEnd: number = parseFloat(balanceReport.totalAssets);
        const totalAssetsAtMarch: number = parseFloat(
          balanceReportMarch.totalAssets,
        );
        const totalLiabilities: number = parseFloat(
          balanceReport.totalLiabilities,
        );
        const capitalLeaseObligations: number = parseFloat(
          balanceReport.capitalLeaseObligations,
        );

        const avgTotalAssets: number =
          (totalAssetsAtEnd + totalAssetsAtMarch) / 2;

        const currentRatio = (totalCurrentAssets / totalCurrentLiabilities)
          .toFixed(2)
          .toString();
        const quickRatio = (
          (totalCurrentAssets - inventory) /
          totalCurrentLiabilities
        )
          .toFixed(2)
          .toString();
        const inventoryTurnover = (costOfRevenue / inventory)
          .toFixed(2)
          .toString();
        const assetsTurnoverRatio = (totalRevenue / avgTotalAssets)
          .toFixed(2)
          .toString();
        const debtToAssetRatio = (totalLiabilities / totalAssetsAtEnd)
          .toFixed(2)
          .toString();
        const debtToEquityRatio = (totalLiabilities / totalShareholderEquity)
          .toFixed(2)
          .toString();
        const longTermDebtToTotalAssetsRatio = (
          (longTermDebt + capitalLeaseObligations) /
          totalAssetsAtEnd
        )
          .toFixed(2)
          .toString();
        const longTermDebtToTotalEquityRatio = (
          longTermDebt / totalShareholderEquity
        )
          .toFixed(2)
          .toString();

        if (metric === "quickRatio") {
          data[year] = quickRatio;
        } else if (metric === "currentRatio") {
          data[year] = currentRatio;
        } else if (metric === "inventoryTurnover") {
          data[year] = inventoryTurnover;
        } else if (metric === "assetTurnover") {
          data[year] = assetsTurnoverRatio;
        } else if (metric === "debtToAssetRatio") {
          data[year] = debtToAssetRatio;
        } else if (metric === "debtToEquityRatio") {
          data[year] = debtToEquityRatio;
        } else if (metric === "longTermDebtToTotalAssetsRatio") {
          if (longTermDebtToTotalAssetsRatio === "NaN") {
            data[year] = "Na";
          } else {
            data[year] = longTermDebtToTotalAssetsRatio;
          }
        } else if (metric === "longTermDebtToTotalEquityRatio") {
          data[year] = longTermDebtToTotalEquityRatio;
        }
      }
    });
    return data as LiquidityRatios;
  });

  return liquidityRatios;
}

function add_data(metrics: Metric[], ratios: Record<string, string>[]) {
  for (const metric of metrics) {
    const metricName = metric.metric;
    for (const report of ratios) {
      if (metricName === report.metric) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { metric: datametric, ...rest } = report;
        metric.data = rest;
        break;
      }
    }
  }
}

function _annualValuationRatios(): ValuationRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "priceToEarningsRatio",
    "priceToSalesRatio",
    "priceToCashFlowRatio",
    "priceToBookRatio",
    "enterpriseRatio",
    "enterpriseValueToEbitdaRatio",
  ];

  const valuationRatios: ValuationRatios[] = metrics.map((metric) => {
    const data: Record<string, string> = {};
    data["metric"] = metric;
    years.forEach((year) => {
      data[year] = "//";
    });
    return data as ValuationRatios;
  });

  return valuationRatios;
}

function _annualProfitabilityRatios(
  incomeStatement: IncomeStatement,
  balanceSheet: BalanceSheet,
): ProfitabilityRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "returnOnAssets",
    "returnOnEquity",
    "returnOnInvestedCapital",
    "grossMargin",
    "operatingMargin",
    "ebitdaMargin",
    "netMargin",
  ];

  const decemberIncomeReports: IncomeStatement["annualReports"] = [];
  for (const report of incomeStatement.annualReports) {
    decemberIncomeReports.push(report);
  }

  const decemberBalanceReports: BalanceSheet["annualReports"] = [];
  for (const report of balanceSheet.annualReports) {
    decemberBalanceReports.push(report);
  }

  const profitabilityRatios: ProfitabilityRatios[] = metrics.map((metric) => {
    const data: Partial<ProfitabilityRatios> = { metric };

    years.forEach((year) => {
      const prevyear: number = +year - 1;
      const incomeReport = decemberIncomeReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const balanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const prevBalanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(prevyear + ""),
      );

      if (incomeReport && balanceReport) {
        const totalRevenue = parseInt(incomeReport.totalRevenue);
        const costOfRevenue = parseInt(incomeReport.costOfRevenue);
        const grossProfit = totalRevenue - costOfRevenue;
        const netIncome = parseInt(incomeReport.netIncome);
        const operatingIncome = parseInt(incomeReport.operatingIncome);
        const totalAssets = parseInt(balanceReport.totalAssets);
        const stakeHolderEquity = parseInt(
          balanceReport.totalShareholderEquity,
        );
        const ebitda = parseInt(incomeReport.ebitda);

        if (metric === "returnOnAssets") {
          data[year] = ((netIncome / totalAssets) * 100).toFixed(2);
        } else if (metric === "returnOnEquity") {
          data[year] = ((netIncome / stakeHolderEquity) * 100).toFixed(2);
        } else if (metric === "grossMargin") {
          data[year] = ((grossProfit / totalRevenue) * 100).toFixed(2);
        } else if (metric === "operatingMargin") {
          data[year] = ((operatingIncome / totalRevenue) * 100).toFixed(2);
        } else if (metric === "ebitdaMargin") {
          data[year] = ((ebitda / totalRevenue) * 100).toFixed(2);
        } else if (metric === "netMargin") {
          data[year] = ((netIncome / totalRevenue) * 100).toFixed(2);
        }
      }
      if (
        incomeReport &&
        balanceReport &&
        metric === "returnOnInvestedCapital"
      ) {
        const netIncome = parseInt(incomeReport.netIncome);
        const totalLiabilitiesDecember = parseInt(
          balanceReport.totalLiabilities,
        );
        const stakeHolderEquity = parseInt(
          balanceReport.totalShareholderEquity,
        );
        const totalInvestedCapitalatcurr =
          totalLiabilitiesDecember + stakeHolderEquity;
        if (prevBalanceReport) {
          const totalLiabilitiesPrevYear = parseInt(
            prevBalanceReport.totalLiabilities,
          );
          const stakeHolderEquityPrevYear = parseInt(
            prevBalanceReport.totalShareholderEquity,
          );

          const totalInvestedCapitalatprev =
            totalLiabilitiesPrevYear + stakeHolderEquityPrevYear;
          const avgTotalInvestedCapital =
            (totalInvestedCapitalatcurr + totalInvestedCapitalatprev) / 2;

          data[year] = ((netIncome / avgTotalInvestedCapital) * 100).toFixed(2);
        } else {
          data[year] = ((netIncome / totalInvestedCapitalatcurr) * 100).toFixed(
            2,
          );
        }
      }
    });
    return data as ProfitabilityRatios;
  });

  return profitabilityRatios;
}

function _annualLiquidityRatios(
  balanceSheet: BalanceSheet,
  incomeStatement: IncomeStatement,
): LiquidityRatios[] {
  const years = Array.from({ length: 15 }, (_, index) =>
    (2023 - index).toString(),
  );
  const metrics = [
    "quickRatio",
    "currentRatio",
    "inventoryTurnover",
    "assetTurnover",
    "debtToAssetRatio",
    "debtToEquityRatio",
    "longTermDebtToTotalAssetsRatio",
    "longTermDebtToTotalEquityRatio",
  ];

  const decemberIncomeReports: IncomeStatement["annualReports"] = [];
  for (const report of incomeStatement.annualReports) {
    decemberIncomeReports.push(report);
  }

  const decemberBalanceReports: BalanceSheet["annualReports"] = [];
  for (const report of balanceSheet.annualReports) {
    decemberBalanceReports.push(report);
  }

  const liquidityRatios: LiquidityRatios[] = metrics.map((metric) => {
    const data: Partial<LiquidityRatios> = { metric };
    data["metric"] = metric;
    years.forEach((year) => {
      const prevyear: number = +year - 1;
      const incomeReport = decemberIncomeReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const balanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(year),
      );
      const prevBalanceReport = decemberBalanceReports.find((report) =>
        report.fiscalDateEnding.startsWith(prevyear + ""),
      );

      if (balanceReport && incomeReport) {
        const longTermDebt: number = parseFloat(balanceReport.longTermDebt);
        const totalCurrentLiabilities: number = parseFloat(
          balanceReport.totalCurrentLiabilities,
        );
        const totalCurrentAssets: number = parseFloat(
          balanceReport.totalCurrentAssets,
        );
        const inventory: number = parseFloat(balanceReport.inventory);
        const totalShareholderEquity: number = parseFloat(
          balanceReport.totalShareholderEquity,
        );
        const costOfRevenue: number = parseFloat(incomeReport.costOfRevenue);
        // const totalRevenue: number = parseFloat(incomeReport.totalRevenue);
        const totalLiabilities: number = parseFloat(
          balanceReport.totalLiabilities,
        );
        const capitalLeaseObligations: number = parseFloat(
          balanceReport.capitalLeaseObligations,
        );
        const totalAssetsAtCurr: number = parseFloat(balanceReport.totalAssets);

        const currentRatio = (totalCurrentAssets / totalCurrentLiabilities)
          .toFixed(2)
          .toString();
        const quickRatio = (
          (totalCurrentAssets - inventory) /
          totalCurrentLiabilities
        )
          .toFixed(2)
          .toString();
        const inventoryTurnover = (costOfRevenue / inventory)
          .toFixed(2)
          .toString();
        const debtToAssetRatio = (totalLiabilities / totalAssetsAtCurr)
          .toFixed(2)
          .toString();
        const debtToEquityRatio = (totalLiabilities / totalShareholderEquity)
          .toFixed(2)
          .toString();
        const longTermDebtToTotalAssetsRatio = (
          (longTermDebt + capitalLeaseObligations) /
          totalAssetsAtCurr
        )
          .toFixed(2)
          .toString();
        const longTermDebtToTotalEquityRatio = (
          longTermDebt / totalShareholderEquity
        )
          .toFixed(2)
          .toString();

        if (metric === "quickRatio") {
          data[year] = quickRatio;
        } else if (metric === "currentRatio") {
          data[year] = currentRatio;
        } else if (metric === "inventoryTurnover") {
          data[year] = inventoryTurnover;
        } else if (metric === "debtToAssetRatio") {
          data[year] = debtToAssetRatio;
        } else if (metric === "debtToEquityRatio") {
          data[year] = debtToEquityRatio;
        } else if (metric === "longTermDebtToTotalAssetsRatio") {
          if (longTermDebtToTotalAssetsRatio === "NaN") {
            data[year] = "N/A";
          } else {
            data[year] = longTermDebtToTotalAssetsRatio;
          }
        } else if (metric === "longTermDebtToTotalEquityRatio") {
          data[year] = longTermDebtToTotalEquityRatio;
        }
      }
      if (balanceReport && metric === "assetTurnover" && incomeReport) {
        const totalRevenue: number = parseFloat(incomeReport.totalRevenue);
        const totalAssetsAtCurr: number = parseFloat(balanceReport.totalAssets);

        if (prevBalanceReport) {
          const totalAssetsAtPrev: number = parseFloat(
            prevBalanceReport.totalAssets,
          );
          const avgTotalAssets: number =
            (totalAssetsAtCurr + totalAssetsAtPrev) / 2;
          const assetsTurnoverRatio = (totalRevenue / avgTotalAssets)
            .toFixed(2)
            .toString();
          data[year] = assetsTurnoverRatio;
        } else {
          const assetsTurnoverRatio = (totalRevenue / totalAssetsAtCurr)
            .toFixed(2)
            .toString();
          data[year] = assetsTurnoverRatio;
        }
      }
    });
    return data as LiquidityRatios;
  });

  return liquidityRatios;
}

export {
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
};
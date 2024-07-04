import { IncomeStatementAnnual } 
  from "@prisma/client";

type MetricKeys = keyof IncomeStatementAnnual;


export type DataPoint = {
  date: string;
  value: number;
};

export interface Metric {
  metric: MetricKeys;
  hasChildren: boolean;
  children: Metric[];
  data?: Record<string, string>;
}

export const metrics: Metric[] = [
  {
    metric: "totalRevenue",
    hasChildren: false,
    children: [],
  },
  {
    metric: "costOfRevenue",
    hasChildren: true,
    children: [
      {
        metric: "costOfGoodsAndServicesSold",
        hasChildren: false,
        children: [],
      },
      {
        metric: "depreciationAndAmortization",
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    metric: "grossProfit",
    hasChildren: false,
    children: [],
  },
  {
    metric: "operatingExpenses",
    hasChildren: true,
    children: [
      {
        metric: "sellingGeneralAndAdministrative",
        hasChildren: false,
        children: [],
      },
      {
        metric: "researchAndDevelopment",
        hasChildren: false,
        children: [],
      },
      {
        metric: "depreciation",
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    metric: "operatingIncome",
    hasChildren: false,
    children: [],
  },
  {
    metric: "incomeBeforeTax",
    hasChildren: true,
    children: [
      {
        metric: "netInterestIncome",
        hasChildren: false,
        children: [],
      },
      {
        metric: "nonInterestIncome",
        hasChildren: false,
        children: [],
      },
      {
        metric: "otherNonOperatingIncome",
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    metric: "netIncome",
    hasChildren: true,
    children: [
      {
        metric: "incomeTaxExpense",
        hasChildren: false,
        children: [],
      },
      {
        metric: "interestAndDebtExpense",
        hasChildren: false,
        children: [],
      },
      {
        metric: "netIncomeFromContinuingOperations",
        hasChildren: false,
        children: [],
      },
      {
        metric: "comprehensiveIncomeNetOfTax",
        hasChildren: false,
        children: [],
      },
    ],
  },
  {
    metric: "ebit",
    hasChildren: false,
    children: [],
  },
  {
    metric: "ebitda",
    hasChildren: false,
    children: [],
  },
];

// // Define types for database records
// export interface AnnualIncomeStatement {
//   fiscalYearEnding: Date;
//   [key: string]: any; // Use index signature to handle dynamic properties
// }

// export interface QuarterlyIncomeStatement {
//   fiscalQuarterEnding: Date;
//   [key: string]: any; // Similar to AnnualIncomeStatement
// }

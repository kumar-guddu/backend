import { BalanceSheet, CashFlow, IncomeStatement, Overview} 
  from "@src/models/FinancialMetrics.interface";
import AlphavantageURLs from "@src/constants/AlphavantageURLs";
import AxiosGet from "@src/routes/axiosRoutes";
import EnvVars from "@src/constants/EnvVars";

const ALPHAVANTAGE_API_KEY = EnvVars.ALPHAVANTAGE_API_KEY;

interface FinancialMetricsParams {
  ticker: string;
}

function getOverviewByTicker(
  params: FinancialMetricsParams): Promise<Overview> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=OVERVIEW&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<Overview>(apiUrl, headers);
}

function getBalanceSheetByTicker(
  params: FinancialMetricsParams): Promise<BalanceSheet> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=BALANCE_SHEET&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<BalanceSheet>(apiUrl, headers);
}

function getCashFlowByTicker(
  params: FinancialMetricsParams): Promise<CashFlow> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=CASH_FLOW&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<CashFlow>(apiUrl, headers);
}

function getIncomeStatementByTicker(
  params: FinancialMetricsParams): Promise<IncomeStatement> {
  const apiUrl = `${AlphavantageURLs.SearchBase}function=INCOME_STATEMENT&` +
    `symbol=${params.ticker}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const headers = {
    "Authorization": ALPHAVANTAGE_API_KEY,
  };

  return AxiosGet<IncomeStatement>(apiUrl, headers);
}

export default {
  getOverviewByTicker,
  getBalanceSheetByTicker,
  getCashFlowByTicker,
  getIncomeStatementByTicker,
} as const;

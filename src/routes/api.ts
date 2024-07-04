import { Router } from "express";
import Paths from "../constants/Paths";
import IncomeStatementRouter from "./IncomeStatementRoutes";
import BalanceSheetRouter from "./BalanceSheetRoutes";
import userRouter from "./UserRoutes";
import searchRouter from "./SearchRoutes";
import CashFlowRouter from "./CashFlowRoutes";
import LatestDataSummaryRouter from "./LatestDataSummaryRoutes";
import StatsRouter from "./StatsRoutes";
import StockPriceGraphRouter from "./GraphRoutes";
import CompanyRouter from "./Companies/";
import WatchList from "./WatchListRoutes/";
import { authenticateToken } from "@src/middleware/authenticateUser";
import NewsAndSentimentsRouter from "./NewsAndSentimentsRoutes";
import CompanyOverviewRouter from "./CompanyOverviewRoutes";
import FormulaRouter from "./FormulaBuilderRoutes";
import RatiosRouter from "./RatioRoutes";
// import SuggestionsRouter from "./SuggestionRoutes";
import GraphStatsRouter from "./GraphStatsRoutes";
import SuggestionRouter from "./FormulaBuilderRoutes/suggestionRoute";
import adminrouter from "./adminRoutes.ts";

const apiRouter = Router();

// Adds API routes
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.CompanyOverview.Base, CompanyOverviewRouter);
apiRouter.use(Paths.IncomeStatement.Base, IncomeStatementRouter);
apiRouter.use(Paths.BalanceSheet.Base, BalanceSheetRouter);
apiRouter.use(Paths.CashFlow.Base, CashFlowRouter);
apiRouter.use(Paths.LatestDataSummary.Base, LatestDataSummaryRouter);
apiRouter.use(Paths.Search.Base, searchRouter);
apiRouter.use(Paths.Statistics.Base, StatsRouter);
apiRouter.use(Paths.Graph.Base, StockPriceGraphRouter);
apiRouter.use(Paths.Company.Base, CompanyRouter);
apiRouter.use(Paths.WatchList.Base, authenticateToken, WatchList);
apiRouter.use(Paths.NewsAndSentiments.Base, NewsAndSentimentsRouter);
apiRouter.use(Paths.Formula.Base, FormulaRouter);
apiRouter.use(Paths.Ratios.Base, RatiosRouter);
apiRouter.use(SuggestionRouter);
apiRouter.use(Paths.GraphStats.Base, GraphStatsRouter);
apiRouter.use(RatiosRouter);
// apiRouter.use(Paths.Ratios.Base, RatiosRouter);
apiRouter.use(Paths.Users.Base, adminrouter);

export default apiRouter;

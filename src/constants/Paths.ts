
export default {
  Base: "/api",
  NewsAndSentiments: {
    Base: "/newsandsentiments",
    GetByTicker: "/:ticker",
  },
  Users: {
    Base: "/auth",
    Get: "/all",
    Add: "/signUp",
    signin: "/signIn",
    signout: "/signOut",
    protected: "/isAuthenticated",
    googleSignIn: "/google",
    Update: "/update",
    Delete: "/delete/:id",
    GenerateOtp: "/generateOTP",
    VerifyOtp: "/verify",
    googleCallback: "/google/callback",
    update: "/completeSignUp",
    userName:"/username",
    Admin: "/admin",
    AdminDashboard:"/dashboard",
  },
  Statistics: {
    Base: "/statistics",
    GetByTicker: "/:ticker",
  },
  IncomeStatement: {
    Base: "/incomeStatementData",
    GetByTicker: "/:ticker",
  },
  BalanceSheet: {
    Base: "/balanceSheetData",
    GetByTicker: "/:ticker",
  },
  LatestDataSummary: {
    Base: "/latestDataSummary",
    GetByTicker: "/:ticker",
  },
  CashFlow: {
    Base: "/cashFlowData",
    GetByTicker: "/:ticker",
  },
  Search: {
    Base: "/search",
    GetByTicker: "/:ticker",
    alphavantage: "/alphavantage",
  },
  Graph: {
    Base: "/stockPriceGraph",
    GetByTicker: "/:ticker",
  },
  GraphStats: {
    Base: "/graphStatistics",
    GetByTicker: "/:ticker",
  },
  CompanyOverview: {
    Base: "/companyoverview",
    GetByTicker: "/:ticker",
  },
  Company: {
    Base: "/companies",
    add: "/add",
  },
  WatchList: {
    Base: "/watchlist",
    create: "/create",
    modify: "/update/:id",
    getWatchListPreview: "/preview",
    getWatchlistWithData: "/data/:id",
  },
  Formula: {
    Base: "/formula",
    customRatio: "/custom",
    metrics: "/metrics",
    create: "/create",
    getAll: "/all",
    getById: "/:id",
    getByTicker: "/:ticker",
    getValue: "/value/:ticker/:id",
    getValidate: "/validate",

  },
  Ratios: {
    Base: "/ratios",
    // add: "/add",
    // getratio: "/getratio/:ratioName",
    ratioValues: "/:ratioId/values",
  },
  Suggestions: {
    Base: "/suggestions",
    metrics: "/metrics",

  },
} as const;

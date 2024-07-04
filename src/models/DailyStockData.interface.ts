// export interface MetaData {
//     "1. Information": string;
//     "2. Symbol": string;
//     "3. Last Refreshed": string;
//     "4. Output Size": string;
//     "5. Time Zone": string;
// }

// export interface TimeSeriesData {
//     "1. open": string;
//     "2. high": string;
//     "3. low": string;
//     "4. close": string;
//     "5. volume": string;
// }

// export interface TimeSeries{
//     [date: string] : TimeSeriesData;
// }

// export interface DailyStockData{
//     "Meta Data":MetaData;
//     "Time Series (Daily)": TimeSeries;

// }

// Define enums for MetaData keys
export enum MetaDataKeys {
  Information = "1. Information",
  Symbol = "2. Symbol",
  LastRefreshed = "3. Last Refreshed",
  OutputSize = "4. Output Size",
  TimeZone = "5. Time Zone",
}

// Define MetaData interface using the enum keys
export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
}

// Define enums for TimeSeriesData keys
export enum TimeSeriesDataKeys {
  Open = "1. open",
  High = "2. high",
  Low = "3. low",
  Close = "4. close",
  Volume = "5. volume",
}

// Define TimeSeriesData interface using the enum keys
export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

// Define TimeSeries interface
export interface TimeSeries {
  [date: string]: TimeSeriesData;
}

export interface DailyStockData {
  "Meta Data": MetaData;
  "Time Series (Daily)": TimeSeries;
}

export enum TimeFrame {
  Intraday = "TIME_SERIES_INTRADAY",
  Daily = "TIME_SERIES_DAILY",
  Weekly = "TIME_SERIES_WEEKLY",
  Monthly = "TIME_SERIES_MONTHLY"
}

export enum Interval {
  OneMinute = "1min",
  FiveMinutes = "5min",
  FifteenMinutes = "15min",
  ThirtyMinutes = "30min",
  SixtyMinutes = "60min"
}
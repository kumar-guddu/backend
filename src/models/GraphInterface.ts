export interface DataPoint {
  [key: string]: number;
}

export interface TimeSeriesDataResponse {
  [key: string]:
    | { [key: string]: DataPoint }
    | {
        [key: string]: string;
      };
}

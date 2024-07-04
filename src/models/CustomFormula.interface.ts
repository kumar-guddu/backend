export interface HistoricalDataEntry{
    date: string;
    value: string;
}

export interface Ratio {
    key: string;
    historicalData: HistoricalDataEntry[]
}

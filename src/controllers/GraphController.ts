import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import GraphServices, { GraphParams } from "@src/services/GraphServices";
import { DataPoint, TimeSeriesDataResponse } from "@src/models/GraphInterface";
import { TimeFrame, Interval } from "@src/models/DailyStockData.interface";

function parseTimeSeriesDataPoints(dataPoints: { [key: string]: DataPoint }) {
  let timeSeriesDataPoints:
    Array<{ date: string;[key: string]: unknown }> = [];
  Object.entries(dataPoints).forEach((datapoint) => {
    let dataValue = Object.prototype;
    Object.entries(datapoint[1]).forEach((item) => {
      const key = item?.[0]?.split(" ")?.[1];
      dataValue = {
        [key]: item[1],
        ...dataValue,
      };
    });
    timeSeriesDataPoints = [
      { date: datapoint[0], ...dataValue },
      ...timeSeriesDataPoints,
    ];
  });
  return timeSeriesDataPoints;
}

export function parseTimeSeriesData(TimeSeriesData: TimeSeriesDataResponse) {
  let res = Object.prototype;
  Object.keys(TimeSeriesData).forEach((key) => {
    if (key.includes("Time Series")) {
      res = {
        TIME_SERIES_DATA: parseTimeSeriesDataPoints(
          TimeSeriesData[key] as { [key: string]: DataPoint },
        ),
      };
    }
  });
  return res;
}

async function getTimeSeriesByTicker(req: IReq<{
  ticker: string,
  timeFrame: string
}>, res: IRes) {
  try {
    const { ticker } = req.params;
    const { timeFrame } = req.body;

    // Set default values
    const params: GraphParams = {
      ticker,
      timeFrame: TimeFrame.Intraday,
      interval: Interval.FiveMinutes,
    };

    // If a specific time frame is provided, use it
    if (timeFrame && Object.values(TimeFrame)
      .includes(timeFrame as TimeFrame)) {
      params.timeFrame = timeFrame as TimeFrame;
      // Set interval only for Intraday time frame
      if (params.timeFrame) {
        params.interval = Interval.FiveMinutes;
      } else {
        delete params.interval; // Remove interval for other time frames
      }
    }

    const graphRes = await GraphServices.getTimeSeriesByTicker(params);
    const TimeSeriesData = parseTimeSeriesData(graphRes);
    return res.status(HttpStatusCodes.OK).json(TimeSeriesData);
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

export default { getTimeSeriesByTicker } as const;


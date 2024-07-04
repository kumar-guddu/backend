import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { cashFlowService } from "@src/Database/services/cashFlowService";


/**
 * this function is used to get the cash flow by ticker and time series
 * @param req {ticker: string, timeSeries: string} - ticker and time series
 * @param res - response
 * @returns {Promise<void>}
 */

async function getCashFlowByTicker(
  req: IReq<{ticker: string, timeSeries: string}>,
  res: IRes,
){
  try {
    const { ticker } = req.params;
    const { timeSeries } = req.body;
    const cashFlowResponse = await cashFlowService.getCashFlowByTicker(
      ticker, timeSeries,
    );
    res.status(HttpStatusCodes.OK).json(cashFlowResponse);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}



export default {getCashFlowByTicker};
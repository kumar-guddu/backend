import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { incomeStatementService } 
  from "@src/Database/services/incomeStatementService";

/**
 * Handles the HTTP request to retrieve income statement data 
 * for a given company ticker and time series.
 * @param req - The request object, expecting 
 * 'ticker' as a parameter and 'timeSeries' in the body.
 * @param res - The response object used to send back 
 * the formatted financial data or an error message.
 */
async function getIncomeStatementByTicker(
  req: IReq<{ticker: string, timeSeries: string}>,
  res: IRes,
){
  try {
    const { ticker } = req.params;
    const { timeSeries } = req.body; 
    const metrics = await incomeStatementService.getIncomeStatementByTicker(
      ticker, timeSeries,
    );
    
    const incomeStatementResponse = {
      incomeStatement: metrics,
    };
    res.status(HttpStatusCodes.OK).json(incomeStatementResponse);
  } catch (error) {
    // Error handling to return an appropriate message and HTTP status code
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

export default {getIncomeStatementByTicker};

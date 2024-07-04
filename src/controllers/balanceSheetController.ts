import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { balanceSheetService } 
  from "@src/Database/services/balanceSheetService";




async function getBalanceSheetByTicker(
  req: IReq<{ticker: string, timeSeries: string}>,
  res: IRes,
){
  try {
    const { ticker } = req.params;
    const { timeSeries } = req.body; 
    const metrics = await balanceSheetService.getBalanceSheetByTicker(
      ticker, timeSeries,
    );
    
    const balanceSheetResponse = {
      balanceSheet: metrics,
    };
    res.status(HttpStatusCodes.OK).json(balanceSheetResponse);
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


export default {getBalanceSheetByTicker};
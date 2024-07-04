import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import RatiosService from "@src/Database/services/RatioService";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { IRatios } from "@src/Database/models/ratioModel";

async function addRatios(req: IReq<{ ratios: IRatios[] }>, res: IRes) {
  try {
    const { ratios } = req.body;
      
    const createdRatios = await RatiosService.createRatios(ratios);
    return res.status(HttpStatusCodes.CREATED).send(createdRatios);
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "an unknown unexpexted error." });
  }
}
async function getRatios(req: IReq, res: IRes){
   
  try {
    const { ratioName } = req.params;
    const ratios = await RatiosService.findRatiosByName(ratioName);
    return res.status(HttpStatusCodes.OK).json(ratios);
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "an unknown unexpexted error." });
  }


}
export default {
  addRatios,getRatios,
} as const;

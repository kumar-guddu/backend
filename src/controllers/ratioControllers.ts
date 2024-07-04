/* eslint-disable max-len */
import { IReq, IRes } from "@src/routes/types/express/misc";
import { ratioService } from "@src/Database/services/ratioServices";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";


async function createRatio(
  req: IReq<
    { Ratio: { name: string; formula: string; description: string; type: string } }
  >,
  res: IRes,
): Promise<IRes> {
  try {
    const { name, formula, description, type } = req.body.Ratio;
    const ratio = await ratioService.createRatio(name, formula, description, type);
    return res.status(HttpStatusCodes.CREATED).json(ratio);
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

async function getRatioById(req: IReq<{ ratioId: string }>, res: IRes): Promise<IRes> {
  const { ratioId } = req.params;

  try {
    const ratio = await ratioService.getRatioById(parseInt(ratioId));
    if (!ratio) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Ratio not found" });
    }
    return res.status(HttpStatusCodes.OK).json(ratio);
  } catch (error) {
    // console.error("Get ratio by ID error:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

async function getRatioByName(req: IReq<{ name: string }>, res: IRes): Promise<IRes> {
  const { name } = req.params;

  try {
    const ratio = await ratioService.getRatioByName(name);
    if (!ratio) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({ message: "Ratio not found" });
    }
    return res.status(HttpStatusCodes.OK).json(ratio);
  } catch (error) {
    // console.error("Get ratio by name error:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

async function getAllRatios(_req: IReq, res: IRes): Promise<IRes> {
  try {
    const ratios = await ratioService.getAllRatios();
    return res.status(HttpStatusCodes.OK).json(ratios);
  } catch (error) {
    // console.error("Get all ratios error:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

async function updateRatio(
  req: IReq<{ ratioId: string; name: string; formula: string; description: string; type: string }>,
  res: IRes,
): Promise<IRes> {
  const { ratioId } = req.params;
  const { name, formula, description, type } = req.body;

  try {
    const updatedRatio = await ratioService.updateRatio(parseInt(ratioId), name, formula, description, type);
    return res.status(HttpStatusCodes.OK).json(updatedRatio);
  } catch (error) {
    // console.error("Update ratio error:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

async function deleteRatio(req: IReq<{ ratioId: string }>, res: IRes): Promise<IRes> {
  const { ratioId } = req.params;

  try {
    await ratioService.deleteRatio(parseInt(ratioId));
    return res.status(HttpStatusCodes.NO_CONTENT).send("Deleted successfully");
  } catch (error) {
    // console.error("Delete ratio error:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
}

export default { createRatio, getRatioById, getRatioByName, getAllRatios, updateRatio, deleteRatio };

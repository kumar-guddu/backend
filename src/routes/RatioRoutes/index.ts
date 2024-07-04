import { Router } from "express";
// import Paths from "@src/constants/Paths";
import ratioController from "@src/controllers/ratioControllers";


const RatiosRouter = Router();

// RatiosRouter.post(Paths.Ratios.add,RatioController.createRatio );
RatiosRouter.post("/ratios", ratioController.createRatio);
// // RatiosRouter.get("/ratios/:ratioId/values", ratioController.);
// RatiosRouter.post("/ratios/:ratioId/calculate", 
//   ratioController.calculateAndStoreRatioValues);
// RatiosRouter.get(Paths.Ratios.getratio, RatioController.getRatios);

RatiosRouter.get("/ratios/id/:ratioId", ratioController.getRatioById);
RatiosRouter.get("/ratios/name/:name", ratioController.getRatioByName);
RatiosRouter.get("/ratios/list", ratioController.getAllRatios);
RatiosRouter.put("/ratios/update/:ratioId", ratioController.updateRatio);
RatiosRouter.delete("/ratios/delete/:ratioId", ratioController.deleteRatio);

export default RatiosRouter;

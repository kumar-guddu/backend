/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
//import jetValidator from 'jet-validator';

import Paths from "@src/constants/Paths";
import WatchlistController from "@src/controllers/watchlistController";
import authMiddleware from "@src/middleware/authMiddleware";
import { IRes } from "../types/express/misc";
//import { isWatchList } from "@src/Database/models/watchList";
//import { authenticateToken } from "@src/middleware/authenticateUser";

//const validate = jetValidator();

const WatchlistRouter = Router();

WatchlistRouter.post(
  Paths.WatchList.create,
  authMiddleware,
  (req, res) => WatchlistController.createWatchlist(req as any, res as IRes),
);

WatchlistRouter.get(
  Paths.WatchList.getWatchListPreview,
  authMiddleware,
  (req, res) => WatchlistController.getAllWatchlists(req as any, res as IRes),
);

// WatchlistRouter.get(
//   Paths.WatchList.getWatchListPreview,
//   WatchListController.getWatchListPreview,
// );

// WatchlistRouter.post(
//   Paths.WatchList.getWatchlistWithData,
//   WatchListController.getWatchListWithData,
// );

export default WatchlistRouter;

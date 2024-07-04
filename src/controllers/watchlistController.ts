import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { watchlistService } from "@src/Database/services/watchlistService";

/**
 * Create a new watchlist for a user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The created watchlist.
 */
async function createWatchlist(
  req: IReq<{ watchList: { name: string, companies: string[] } }>,
  res: IRes,
): Promise<IRes> {
  try {
    const sessionUser = res.locals.sessionUser;
    if (!sessionUser) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        message: "You must be logged in to create a watchlist.",
      });
    }

    // console.log(sessionUser);

    const { name, companies } = req.body.watchList;
    const watchlist = await watchlistService.createWatchlist(
      sessionUser.id, name, companies,
    );

    return res.status(HttpStatusCodes.CREATED).json(watchlist);
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

/**
 * Get all watchlists for a user.
 * @param req - The request object.
 * @param res - The response object.
 * @returns Array of watchlists.
 * */
async function getAllWatchlists(
  req: IReq,
  res: IRes,
): Promise<IRes> {
  try {
    const sessionUser = res.locals.sessionUser;
    if (!sessionUser) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({
        message: "You must be logged in to view your watchlists.",
      });
    }

    const watchlists = await watchlistService.getAllWatchlists(
      sessionUser.id,
    );

    return res.status(HttpStatusCodes.OK).json(watchlists);
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

export default { createWatchlist, getAllWatchlists };

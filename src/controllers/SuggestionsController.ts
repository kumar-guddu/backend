import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import SuggestionsService from "@src/Database/services/SuggestionsService";
import { IReq, IRes } from "@src/routes/types/express/misc";

async function fetchMetricSuggestions(req: IReq, res: IRes) {
  try {
    const query = (req.query.query || "") as string; // Type assertion

    if (!query) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: "Query parameter 'query' must be provided and must be a string",
      });
    }

    const createdSuggestions = await SuggestionsService.findSuggestionsByName(
      query,
    );
    return res.status(HttpStatusCodes.CREATED).send(createdSuggestions);
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to fetch metric suggestions" });
  }
}

export default { fetchMetricSuggestions } as const;

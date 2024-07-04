import { IReq, IRes } from "@src/routes/types/express/misc";
import { suggestionService } 
  from "@src/Database/services/formulaBuilderServices/suggestionService";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";


async function getSuggestions(req: IReq, res: IRes) {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm || typeof searchTerm !== "string") {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "Search term is required and must be a string.",
      });
    }
    const suggestions = await suggestionService.getSuggestions(searchTerm);
    return res.status(HttpStatusCodes.OK).json(suggestions);
  } catch (error) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to get suggestions.",
    });
  }
}

export default {getSuggestions};

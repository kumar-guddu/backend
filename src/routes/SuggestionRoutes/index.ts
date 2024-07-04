import { Router } from "express";
import Paths from "@src/constants/Paths";
import SuggestionsController from "@src/controllers/SuggestionsController";

const SuggestionsRouter = Router();

SuggestionsRouter.get(Paths.Suggestions.metrics, 
  SuggestionsController.fetchMetricSuggestions);

export default SuggestionsRouter;
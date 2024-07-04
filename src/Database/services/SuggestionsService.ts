import { MetricSuggestionsResponse } from "@src/models/Suggestions.interface";
import Ratios from "@src/Database/models/ratioModel";


const findSuggestionsByName = async (query: string):
  Promise<MetricSuggestionsResponse> => {
  try {
    const ratios = await Ratios.find({
      ratioName: {
        $regex: `^${query}`,
        $options: "i",
      },
    });
    const ratioNames = ratios.map(ratio => ratio.ratioName);
    const operators=["+","-","*","/","%","(",")"];
    const mergedFormula=[...ratioNames,...operators];
    return { metrics: mergedFormula};
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred");
  }
};

export default { findSuggestionsByName } as const;
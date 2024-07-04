
import Ratios,{ IRatios } from "@src/Database/models/ratioModel";

const findRatiosByName = async (ratioName: string): Promise<IRatios> => {
  try {
    const ratios = await Ratios.findOne({
      $or: [{ ratioName }],
    });
    if (!ratios) throw new Error("Cannot find the ratio");
    return ratios;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred");
  }
};

const createRatio = async (
  ratioToInsert: IRatios,
): Promise<IRatios | string> => {
  try {
    
    const { ratioName,databaseRatioName, 
      formula,description,historicalData } = ratioToInsert;
    const existingRatio = await Ratios.find({
      $or: [{ ratioName }],
    });
    if (existingRatio.length > 0) {
      return "Ratios already exist with the provided ratioName";
    }
    const ratio = new Ratios({
    
      ratioName,
      databaseRatioName,
      formula,
      description,
      historicalData,
    });
  
    return await ratio.save();
  } catch (error) {
    throw new Error("Error when creating the ratios: " + error);
  }
};

const createRatios = async (
  ratios: IRatios[],
): Promise<string> => {
  try {
   
    const results = await Promise.all(ratios.map(async (ratio) => {
      return createRatio(ratio);
    }));

    // Check for errors in the results
    const errors = results.filter(result => typeof result === "string");
    if (errors.length > 0) {
      return `Some ratios were not created: ${errors.join(", ")}`;
    }
    return "Ratios Created Successfully";
  } catch (error) {
    throw new Error("Error when creating the ratios: " + error);
  }
};



export default { createRatio, createRatios, findRatiosByName } as const;

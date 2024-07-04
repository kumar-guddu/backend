import CustomRatio, { ICustomRatio }
  from "@src/Database/models/customRatioModel";
import { validateFormula } from "@src/util/FormulaBuilder/RatioValidation";
import allmetricdata from "@src/constants/Data/allMetricsData.json";
import { MathJsInstance, all, create } from "mathjs";
import { HistoricalDataEntry, Ratio }
  from "@src/models/CustomFormula.interface";
import formatNumberWithSuffix from "@src/util/numberFormatUtil";



const math: MathJsInstance = create(all);


async function createCustomRatio(customRatio: ICustomRatio) {
  if (!validateFormula(customRatio.formula)) {
    throw new Error("Invalid formula. Please use " +
      "only predefined ratios and metrics.");
  }
  const newCustomRatio = new CustomRatio(customRatio);
  return await newCustomRatio.save();
}

async function getAllCustomRatiosByUser(user: string) {
  return await CustomRatio.find({ user });
}

async function getCustomRatioById(id: string) {
  return await CustomRatio.findById(id);
}


async function getValueCustomRatioData(id: string) {
  const userFormula = await CustomRatio.findById(id);
  if (!userFormula) {
    throw new Error("Invalid name provided or formula not" 
      +"found in the database.");
  }

  const formula = userFormula.formula;
  const data = allmetricdata;


  const metricKeys = formula.match(/\b\w+\b/g);

  if (!metricKeys) {
    throw new Error("No valid metrics found in the formula.");
  }

  const metricData: { [key: string]: HistoricalDataEntry[] } = {};
  metricKeys.forEach(metricKey => {
    const metric = data.ratios.find((ratio: Ratio) => ratio.key === metricKey);
    if (!metric) {
      throw new Error(`Metric ${metricKey} is missing from the data.`);
    }
    metricData[metricKey] = metric.historicalData;
  });


  const dateOrder = metricData[metricKeys[0]]
    .map((entry: HistoricalDataEntry) => entry.date);

  const newHistoricalData = dateOrder.map(date => {
    const values: { [key: string]: number | null } = {};

    metricKeys.forEach(key => {
      const metricEntry = metricData[key]
        .find((entry: HistoricalDataEntry) => entry.date === date);
      values[key] = metricEntry ? parseFloat(metricEntry.value) : null;
    });


    if (Object.values(values).some(value => value === null)) {
      return null;
    }


    const customRatioValue = math.evaluate(formula, values) as number;
    const customRatioValueWithUnit = formatNumberWithSuffix(customRatioValue);

    return {
      date,
      value: customRatioValueWithUnit,
    };
  }).filter(entry => entry !== null) as { date: string, value: string }[];

  return newHistoricalData;
}

export default {
  createCustomRatio,
  getAllCustomRatiosByUser,
  getCustomRatioById,
  getValueCustomRatioData,
};

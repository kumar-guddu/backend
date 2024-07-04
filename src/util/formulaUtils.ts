/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/util/formulaUtils.ts

// src/util/formulaUtils.ts

import { create, all } from "mathjs";

const math = create(all, {});

export function evaluateFormula(
  formula: string, 
  data: Record<string, number>): number {
  try {
    const compiledFormula = math.evaluate(formula, data);
    return parseFloat(compiledFormula.toFixed(2)); // Round to 2 decimal places
  } catch (error) {
    throw new Error("Invalid formula");
  }
}

export function validateFormula(formula: string): boolean {
  try {
    math.parse(formula);
    return true;
  } catch (error) {
    return false;
  }
}


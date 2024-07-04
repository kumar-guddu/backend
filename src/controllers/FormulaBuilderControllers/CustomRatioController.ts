/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import CustomRatioServices from "@src/Database/services/customRatioService";
import { ICustomRatio } from "@src/Database/models/customRatioModel";
import { IReq, IRes } from "@src/routes/types/express/misc";
import {
  replaceNamesWithKeys,
  replaceKeysWithNames,
} from "@src/util/FormulaBuilder/RatioMap";
import { validateFormulaExp } from "@src/util/FormulaBuilder/formulaValidation";

type ICreateCustomRatio = Omit<ICustomRatio, "user">;

async function createCustomRatio(
  req: IReq<{ customRatio: ICreateCustomRatio }>,
  res: IRes,
) {
  // try {
  //   const sessionUser = res.locals.sessionUser;
  //   if (!sessionUser) {
  //     throw new Error("Session user is undefined");
  //   }
  //   const { customRatio } = req.body;

  //   // Transform the formula before storing
  //   const transformedFormula = replaceNamesWithKeys(customRatio.formula);
  //   const transformedCustomRatio = {
  //     ...customRatio,
  //     formula: transformedFormula,
  //   };

  //   const check = validateFormulaExp(transformedFormula);
  //   if (!check) {
  //     throw new Error("syntax is incorrect");
  //   }




  //   // console.log(`Original formula: ${customRatio.formula}`);
  //   // console.log(`Transformed formula: ${transformedFormula}`);

  //   const createdCustomRatio = await CustomRatioServices.createCustomRatio({
  //     user: sessionUser.email,
  //     ...transformedCustomRatio,
  //   });

  //   return res.status(HttpStatusCodes.CREATED).send(createdCustomRatio);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return res
  //       .status(HttpStatusCodes.BAD_REQUEST)
  //       .send({ error: error.message });
  //   } else {
  //     return res
  //       .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
  //       .send({ error: "An unknown error occurred" });
  //   }
  // }
}



async function getCustomRatios(req: IReq, res: IRes) {
  // try {
  //   const sessionUser = res.locals.sessionUser;
  //   if (!sessionUser) {
  //     throw new Error("Session user is undefined");
  //   }
  //   const customRatios = await CustomRatioServices.getAllCustomRatiosByUser(
  //     sessionUser.email,
  //   );
  //   const transformedCustomRatios = customRatios.map((ratio) => {
  //     const ratioObject = ratio.toObject();
  //     return {
  //       _id: ratioObject._id as string,
  //       name: ratioObject.name,
  //       formula: replaceKeysWithNames(ratioObject.formula),
  //       description: ratioObject.description,
  //     };
  //   });
  //   return res
  //     .status(HttpStatusCodes.OK)
  //     .send({ customRatios: transformedCustomRatios });
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return res
  //       .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
  //       .send({ error: error.message });
  //   } else {
  //     return res
  //       .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
  //       .send({ error: "An unknown error occurred" });
  //   }
  // }
}

async function getCustomRatio(req: IReq, res: IRes) {
  try {
    const { id } = req.params;
    const customRatio = await CustomRatioServices.getCustomRatioById(id);

    if (!customRatio) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .send({ error: "Custom Ratio not found" });
    }

    // Extract necessary fields and transform the formula
    const response = {
      _id: customRatio._id as string,
      user: customRatio.user,
      name: customRatio.name,
      formula: replaceKeysWithNames(customRatio.formula),
      description: customRatio.description,
    };

    return res.status(HttpStatusCodes.OK).send({ customRatio: response });
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

async function getValueCustomRatio(req: IReq<{
  ticker?: string,
  id?: string
}>, res: IRes) {
  try {

    const sessionUser = res.locals.sessionUser;
    const { ticker, id } = req.params;

    if (!sessionUser) {
      throw new Error("Session user is undefined");
    }
    if (!ticker) {
      throw new Error("ticker is missing");
    }
    // const name = req.query.name as string;

    // if (!name) {
    //   throw new Error("Name parameter is missing");
    // }

    if (!id) {
      throw new Error("id parameter is missing");
    }






    const valueCustomRatio =
      await CustomRatioServices.getValueCustomRatioData(id);
    return res
      .status(HttpStatusCodes.OK).send({ customValueData: valueCustomRatio });


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

function validateCustomRatio(
  req: IReq<{ formula: string }>,
  res: IRes,
) {
  try {
    const sessionUser = res.locals.sessionUser;
    if (!sessionUser) {
      throw new Error("Session user is undefined");
    }
    const { formula } = req.body;

    const transformedFormula = replaceNamesWithKeys(formula);

    const check = validateFormulaExp(transformedFormula);

    return res.status(HttpStatusCodes.OK).send({ "validFormula": check });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ error: error.message });
    } else {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "An unknown error occurred" });
    }
  }
}

export default {
  createCustomRatio,
  getCustomRatios,
  getCustomRatio,
  getValueCustomRatio,
  validateCustomRatio,
};

import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import CompanyService from "@src/Database/services/companies";
import { IReq, IRes } from "@src/routes/types/express/misc";
import { ICompany } from "@src/Database/models/company";

async function addCompanies(req: IReq<{ companies: ICompany[] }>, res: IRes) {
  try {
    const { companies } = req.body;
    const createdCompanies = await CompanyService.createCompanies(companies);
    return res.status(HttpStatusCodes.CREATED).send(createdCompanies);
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

export default {
  addCompanies,
} as const;

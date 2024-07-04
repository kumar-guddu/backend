import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
import SearchService from "@src/services/SearchService/SearchService";
import CompanyService from "@src/Database/services/companies";
import { parsePaginationParams }
  from "@src/util/PaginationUtils/PaginationUtils";
import CompanySearchParams from "@src/routes/SearchRoutes/Interface";

async function getCompanyListByTicker(
  req: IReq<{ ticker: string }>,
  res: IRes,
) {
  try {
    const { ticker } = req.params;
    const { page, pageSize } = parsePaginationParams(req);

    const companySearchParams: CompanySearchParams = {
      ticker,
      page,
      pageSize,
    };

    const companyList = await SearchService.getCompanyListByTicker(
      companySearchParams,
    );

    const filteredCompanyList = companyList.map((company) => ({
      name: company.name,
      type: company.type,
      ticker: company.symbol,
    }));

    return res
      .status(HttpStatusCodes.OK)
      .json({ companyList: filteredCompanyList });
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

async function getCompanyListByTickerDataBase(
  req: IReq<{ ticker: string }>,
  res: IRes,
) {
  try {
    const { ticker } = req.params;

    const companyList = await CompanyService.findCompaniesByPartialMatch(
      ticker,
    );

    return res.status(HttpStatusCodes.OK).json({ companyList });
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
  getCompanyListByTicker,
  getCompanyListByTickerDataBase,
} as const;


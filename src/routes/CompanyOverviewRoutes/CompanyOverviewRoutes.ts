// //const moment = require("moment");
// import HttpStatusCodes from "@src/constants/HttpStatusCodes";
// import { IReq, IRes } from "../types/express/misc";
// import CompanyOverviewService from "@src/services/CompanyOverviewService";



// export async function getCompanyOverviewByTicker(
//   req: IReq<{ticker: string}>, res: IRes) {
//   try {
//     const { ticker } = req.params;
//     const CompanyOverviewParams = {
//       ticker,
//     };
//     const CompanyOverview = 
//           await CompanyOverviewService
//             .getCompanyOverviewByTicker(CompanyOverviewParams);
//     return res.status(HttpStatusCodes.OK).json({ CompanyOverview });

//   } catch (error) {
//     // eslint-disable-next-line
//     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
//.json({ error: error.message });
//   }
// }
// export default { getCompanyOverviewByTicker } as const;
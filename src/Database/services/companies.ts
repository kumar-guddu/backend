//import { isMatchAboveThreshold } from '@src/util/SearchUtils/stringMatch';
import Company, { ICompany } from "../models/company";

const findCompanyById = async (_id: string): Promise<ICompany> => {
  try {
    const company = await Company.findOne({
      $or: [{ _id }],
    });
    if (!company) throw new Error("Cannot find the company"); 
    return company;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error querying  companies");
  }
};


const createCompany = async (
  companyToInsert: Omit<ICompany, "_id">,
): Promise<ICompany | string> => {
  try {
    const { ticker, name, type } = companyToInsert;
    const existingCompany = await Company.findOne({ ticker });

    if (existingCompany) {
      return "Company already exist with the provided cik or ticker.";
    }
    const company = new Company({
      ticker,
      name,
      type,
    });
    await company.save();
    return company;
  } catch (error) {
    throw new Error("Error when creating the company: " + error);
  }
};

const createCompanies = async (
  companies: ICompany[],
): Promise<string> => {
  try {
    const results = await Promise.all(companies.map(async (company) => {
      return createCompany(company);
    }));

    // Check for errors in the results
    const errors = results.filter(result => typeof result === "string");
    if (errors.length > 0) {
      return `Some companies were not created: ${errors.join(", ")}`;
    }
    return "Companies Created Successfully";
  } catch (error) {
    throw new Error("Error when creating the company: " + error);
  }
};

const findCompaniesByPartialMatch = 
  async (query: string): Promise<ICompany[]> => {
    try {
      // Case-insensitive regex for partial match
      const regex = new RegExp(query, "i"); 
      const potentialMatches = await Company.find({
        $or: [
          { ticker: regex },
          { name: regex },
        ],
      });

      // Filter matches based on the 50% threshold
      // const threshold = 0.5;
      // const matches = potentialMatches.filter(company =>
      //   isMatchAboveThreshold(query, company.ticker, threshold) ||
      //   isMatchAboveThreshold(query, company.name, threshold)
      // );

      return potentialMatches;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Error querying companies");
    }
  };

export default
{ createCompany, createCompanies,
  findCompaniesByPartialMatch, findCompanyById } as 
const;

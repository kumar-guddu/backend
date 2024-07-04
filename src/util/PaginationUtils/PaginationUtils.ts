import {Request} from "express";

function parsePaginationParams(req:Request){
  // Default to page 1 if not provided
  const page = parseInt(req.query.page?.toString() || "1", 10); 
  // Default to page size 10 if not provided
  const pageSize = parseInt(req.query.pageSize?.toString() || "10", 10); 

  return { page, pageSize };

}

export { parsePaginationParams };
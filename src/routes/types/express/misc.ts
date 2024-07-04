import { Request, Response } from "express";

// **** Express **** //

export interface IReq<T = void> extends Request {
  body: T;
  cookies: {
    access_token?: string;
  };
}

export interface IRes extends Response {
  locals: {
    sessionUser?: { id: number };
  };
}

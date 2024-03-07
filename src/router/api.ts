import { Request, Response, NextFunction } from "express";

import { getConnection } from "../db";

export const welcome = async (req: Request, res: Response, next: NextFunction) => {
  const client = await getConnection();
  res.send("Hello, world!");
}

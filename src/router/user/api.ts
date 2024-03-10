import { Request, Response, NextFunction } from "express";

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
  return next();
}

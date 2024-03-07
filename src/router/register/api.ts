import { Request, Response, NextFunction } from "express";

export const handleRegister = (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, world!");
}

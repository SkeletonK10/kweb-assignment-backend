import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { getConnection } from "../../db";
import { decodeJWT, signJWT } from "../../util/auth";
import { JwtPayload } from "jsonwebtoken";


export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT name, isstudent
  FROM userinfo
  WHERE id=$1
  `;
  
  try {
    const payload: any = decodeJWT(req.headers.authorization);
    const id: string = payload.id;
    // console.log(id);  
    const client = await getConnection();
    const result = (await client.query(query, [id])).rows[0];
    await client.end();
    if (result !== undefined) {
      res.json(result);
    } else {
      res.json({
        code: 3001,
        msg: "해당하는 유저를 찾을 수 없습니다!",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      code: 9001,
      msg: "DB 동작 중 오류가 발생했습니다. 다시 시도해 주세요.",
    });
  } finally {
    return next();
  }
}

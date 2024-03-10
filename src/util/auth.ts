import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getConnection } from '../db';

import { jwtKey } from '../secret';


export const validateRegInfo = (id: string, pw: string) => {
  const idExp = RegExp(`^[A-Za-z0-9]{3,32}$`);
  const pwExp = RegExp(`^[A-Za-z0-9]{8,}$`);
  if (idExp.test(id) === false)
    return 1;
  
  else if (pwExp.test(pw) === false)
    return 2;
  
  return 0;
}

export const encodePW = (pw: string) => {
  const encodedPW = bcrypt.hashSync(pw, 10);
  console.log(encodedPW);
  return encodedPW;
}

export const signJWT = (id: string) => {
  const token = jwt.sign(
    {
      type: "JWT",
      id: id,
    },
    jwtKey,
    {
      expiresIn: "30m",
    }
  );
  return token;
}

export const decodeJWT = (token: string | undefined) => {
  if (token === undefined) {
    throw new Error("Token has not came!");
  }
  const decoded = jwt.verify(token, jwtKey);
  // console.log(decoded);
  return decoded;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT id, name, stid, isstudent
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
      req.user = result;
    } else {
      res.status(401).json({
        code: 3001,
        msg: "해당하는 유저를 찾을 수 없습니다!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 9001,
      msg: "DB 동작 중 오류가 발생했습니다. 다시 시도해 주세요.",
    });
  } finally {
    return next();
  }
}
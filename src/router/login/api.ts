import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { getConnection } from "../../db";
import { signJWT } from "../../util/auth";


export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT id, pw
  FROM userinfo
  WHERE id=$1
  `;
  
  try {
    const client = await getConnection();
    
    const result = (await client.query(query, [req.body.id])).rows[0];
    await client.end();
    
    if (result !== undefined) {
      if (bcrypt.compareSync(req.body.pw, result.pw)) {
        const token = signJWT(req.body.id);
        res.json({
          code: 0,
          msg: "로그인 성공!",
          token: token,
        });
      } else {
        res.json({
          code: 2002,
          msg: "비밀번호가 다릅니다!",
        });
      }
    } else {
      res.json({
        code: 2001,
        msg: "아이디를 찾을 수 없습니다.",
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

import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";
import { validateRegInfo, encodePW } from "../../util/auth";

export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  const idQuery = `
  SELECT id
  FROM userInfo
  WHERE id=$1
  `;
  
  const query = `
  INSERT INTO userInfo (
    id,
    pw,
    name,
    stID,
    isStudent)
  VALUES ($1, $2, $3, $4, $5)
  `;
  try {
    const client = await getConnection();
    const idDup = (await client.query(idQuery, [req.body.id])).rows;
    console.log(idDup);
    if (idDup.length !== 0) {
      res.json({
        code: 1001,
        msg: "아이디가 중복됩니다!"
      });
      return next();
    }
    
    const lenCheck = validateRegInfo(req.body.id, req.body.pw);
    if (lenCheck === 1) {
      res.json({
        code: 1002,
        msg: "아이디가 조건에 맞지 않습니다!",
      });
      return next();
    }
    else if (lenCheck === 2) {
      res.json({
        code: 1003,
        msg: "비밀번호가 조건에 맞지 않습니다!",
      });
      return next();
    }
    
    const encodedPW = encodePW(req.body.pw);
    const queryParams = [
      req.body.id,
      encodedPW,
      req.body.name,
      req.body.stID,
      req.body.isStudent
    ];
    await client.query(query, queryParams);
    await client.end();
    res.json({
      code: 0,
      msg: "회원가입 완료!",
    })
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

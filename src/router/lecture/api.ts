import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";


export const getLectureList = async (req: Request, res: Response, next: NextFunction) => {
  const studentQuery = `
  SELECT  L.id as id,
          L.name as name,
          U.name as professor
  FROM    lecture as L
          JOIN
          userinfo as U ON L.professor = U.id
          JOIN
          lecture_take as T ON L.id = T.lecture
  WHERE T.student=$1
  `;
  
  const professorQuery = `
  SELECT  id,
          name,
          professor
  FROM    lecture
  WHERE   professor=$1
  `;
  
  try {
    if (!req.user) {
      res.json({
        code: 3009,
        msg: "유저 인증에 실패했습니다. 다시 시도해 주세요.",
      });
      throw new Error();
    } 
    const client = await getConnection();
    const result = (await client.query(((req.user.isstudent) ? studentQuery : professorQuery), [req.user.id])).rows;
    await client.end();
    res.json(result);
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

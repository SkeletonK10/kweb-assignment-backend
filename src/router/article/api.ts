import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT  A.id as id,
          A.title as title,
          A.createdat as createdat,
          L.name as lecture,
          L.professor as professor,
          A.content as content
  FROM    article as A
          JOIN
          lecture as L ON A.lecture=L.id
  WHERE A.id=$1
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
    const result = (await client.query(query, [req.params.id])).rows[0];
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

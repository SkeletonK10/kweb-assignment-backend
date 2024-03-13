import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";

export const getLecture = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT  L.id as id,
          L.name as name,
          U.id as professorid,
          U.name as professor
  FROM    lecture as L
          JOIN
          userinfo as U ON L.professor = U.id
  WHERE L.id=$1
  `;
  
  const articleQuery = `
  SELECT  id,
          title,
          TO_CHAR(createdat, 'YYYY.MM.DD') as createdat
  FROM article
  WHERE lecture=$1
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
    const articles = (await client.query(articleQuery, [req.params.id])).rows;
    await client.end();
    res.json({
      ...result,
      articles: articles,
    });
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

export const openLecture = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  INSERT INTO lecture (
    professor,
    name)
  VALUES ($1, $2)
  `;
  try {
    if (req.user === undefined || req.user.isstudent) {
      res.status(401).json({
        code: 3003,
        msg: "강의 개설은 교수자만 가능합니다!",
      });
      return next();
    }
    const client = await getConnection();
    await client.query(query, [req.user.id, req.body.name]);
    await client.end();
    res.json({
      code: 0,
      msg: "강의 개설 완료!",
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

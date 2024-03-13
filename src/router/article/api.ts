import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  const query = `
  SELECT  A.id as id,
          A.title as title,
          TO_CHAR(A.createdat, 'YYYY.MM.DD') as createdat,
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

export const postArticle = async (req: Request, res: Response, next: NextFunction) => {
  const verifyQuery = `
  SELECT professor
  FROM lecture
  WHERE id=$1
  `;
  const query = `
  INSERT INTO article (
    lecture,
    title,
    content)
  VALUES ($1, $2, $3)
  `;
  try {
    const client = await getConnection();
    const verify = (await (client.query(verifyQuery, [req.params.id]))).rows[0];
    if (req.user === undefined || req.user.id !== verify.professor) {
      console.log(req.user?.id);
      console.log(verify.professor);
      res.status(401).json({
        code: 3002,
        msg: "글쓰기는 강의 담당 교수만 가능합니다!",
      });
      return next();
    }
    await client.query(query, [
      req.params.id,
      req.body.title,
      req.body.content,
    ]);
    await client.end();
    res.json({
      code: 0,
      msg: "글쓰기 완료!",
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
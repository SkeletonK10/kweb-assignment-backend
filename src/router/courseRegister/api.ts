import { Request, Response, NextFunction } from "express";

import { getConnection } from "../../db";

export const handleCourseRegister = async (req: Request, res: Response, next: NextFunction) => {
  const dupQuery = `
  SELECT student
  FROM lecture_take
  WHERE lecture=$1 AND student=$2
  `;
  
  const query = `
  INSERT INTO lecture_take (
    lecture,
    student)
  VALUES ($1, $2)
  `;
  
  try {
    if (req.user === undefined || req.user.isstudent === false) {
      res.json({
        code: 3004,
        msg: "수강신청은 학생만 가능합니다!",
      });
      return next();
    }
    const client = await getConnection();
    const dup = (await client.query(dupQuery, [req.params.id, req.user.id])).rows[0];
    if (dup !== undefined) {
      res.json({
        code: 4001,
        msg: "이미 수강신청된 강의입니다!",
      });
      return next();
    }
    await client.query(query, [req.params.id, req.user.id]);
    await client.end();
    res.json({
      code: 0,
      msg: "수강신청 완료!",
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
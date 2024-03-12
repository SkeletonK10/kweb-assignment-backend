import { Router } from "express";

import { auth } from "../../util/auth";
import { getLectureList, getLecture, openLecture } from "./api";

const router = Router();

router.get("/", auth, getLectureList);
router.get("/:id", auth, getLecture);

router.post("/", auth, openLecture);

export default router;

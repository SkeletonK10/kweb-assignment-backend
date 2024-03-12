import { Router } from "express";

import { auth } from "../../util/auth";
import { getLectureList, getTakingLectureList } from "./api";

const router = Router();

router.get("/", auth, getLectureList);
router.get("/:id", auth, getTakingLectureList);

export default router;

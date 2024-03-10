import { Router } from "express";

import { auth } from "../../util/auth";
import { getLectureList } from "./api";

const router = Router();

router.get("/", auth, getLectureList);

export default router;

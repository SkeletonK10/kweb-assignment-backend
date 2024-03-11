import { Router } from "express";

import { auth } from "../../util/auth";
import { getLectureList, getLecture } from "./api";

const router = Router();

router.get("/", auth, getLectureList);
router.get("/:id", auth, getLecture);

export default router;

import { Router } from "express";

import { auth } from "../../util/auth";
import { getLecture, openLecture } from "./api";

const router = Router();

router.get("/:id", auth, getLecture);

router.post("/", auth, openLecture);

export default router;

import { Router } from "express";

import { auth } from "../../util/auth";
import { getArticle } from "./api";

const router = Router();

router.get("/:id", auth, getArticle);

export default router;

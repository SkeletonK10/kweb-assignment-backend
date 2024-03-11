import { Router } from "express";

import { auth } from "../../util/auth";
import { getArticle, postArticle } from "./api";

const router = Router();

router.post("/:id/", auth, postArticle);
router.get("/:id/", auth, getArticle);

export default router;

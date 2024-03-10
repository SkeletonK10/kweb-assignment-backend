import { Router } from "express";

import { getUserInfo } from "./api";

import { auth } from "../../util/auth";

const router = Router();

router.get("/", auth, getUserInfo);

export default router;

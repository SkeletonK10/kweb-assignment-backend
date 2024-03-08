import { Router } from "express";

import { getUserInfo } from "./api";

const router = Router();

router.get("/", getUserInfo);

export default router;

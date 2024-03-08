import { Router } from "express";

import { handleLogin } from "./api";

const router = Router();

router.post("/", handleLogin);

export default router;

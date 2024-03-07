import { Router } from "express";

import { handleRegister } from "./api";

const router = Router();

router.post("/", handleRegister);

export default router;

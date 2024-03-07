import { Router } from "express";

import { welcome } from "../api";

const router = Router();

router.get("/", welcome);

export default router;

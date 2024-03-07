import { Router } from "express";

import { welcome } from "./api";

import login from "./login";
import register from "./register";

const router = Router();

router.get("/", welcome);

router.use("/login/", login);
router.use("/register/", register);

export default router;

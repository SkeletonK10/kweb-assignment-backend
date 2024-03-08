import { Router } from "express";

import { welcome } from "./api";

import login from "./login";
import register from "./register";
import auth from "./auth";

const router = Router();

router.get("/", welcome);

router.use("/login/", login);
router.use("/register/", register);
router.use("/auth/", auth);

export default router;

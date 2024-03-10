import { Router } from "express";

import { welcome } from "./api";

import login from "./login";
import register from "./register";
import user from "./user";
import lecture from "./lecture";

const router = Router();

router.get("/", welcome);

router.use("/login/", login);
router.use("/register/", register);
router.use("/user/", user);
router.use("/lecture/", lecture);

export default router;

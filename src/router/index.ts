import { Router } from "express";

import { welcome } from "./api";

import login from "./login";
import register from "./register";
import user from "./user";
import lecture from "./lecture";
import article from "./article";

const router = Router();

router.get("/", welcome);

router.use("/login/", login);
router.use("/register/", register);
router.use("/user/", user);
router.use("/lecture/", lecture);
router.use("/article/", article);

export default router;

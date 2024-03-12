import { Router } from "express";

import { welcome } from "./api";

import login from "./login";
import register from "./register";
import user from "./user";
import lecture from "./lecture";
import lectureList from "./lectureList";
import article from "./article";
import courseRegister from "./courseRegister";

const router = Router();

router.get("/", welcome);

router.use("/login/", login);
router.use("/register/", register);
router.use("/user/", user);
router.use("/lecture/", lecture);
router.use("/lecturelist/", lectureList);
router.use("/article/", article);
router.use("/courseregister/", courseRegister);

export default router;

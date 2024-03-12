import { Router } from "express";

import { auth } from "../../util/auth";
import { handleCourseRegister } from "./api";

const router = Router();

router.post("/:id", auth, handleCourseRegister);

export default router;

import { Router } from "express";
import { auth } from "../../middleware/auth.js";
// import { validation } from "../../middleware/validation.js";
// import { endPoints } from "./auth.endPoint.js";
// import { signUpSchema, updateRoleSchema } from "./auth.validation.js";
import * as registerControl from './controller/registration.js'
import { validation } from "../../middleware/validation.js";
import { LoginSchema, signUpSchema } from "./auth.validation.js";

const router = Router()


router.post('/signUp',validation(signUpSchema),registerControl.signUp)
router.post('/logIn',validation(LoginSchema),registerControl.logIn)





export default router
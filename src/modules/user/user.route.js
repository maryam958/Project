import { Router } from "express";
import * as UserControllers from './controller/user.controller.js'
import { endPoints } from "./user.endPoint.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { AddUser } from "./user.validation.js";
const router=Router()


router.get('/getAllUsers',auth(endPoints.getAllUsers),UserControllers.getAllUsers)
router.post('/AddUser',validation(AddUser),auth(endPoints.AddUser),UserControllers.AddUser)
router.put('/UpdateUser/:id',auth(endPoints.UpdateUser),UserControllers.UpdateUser)
router.delete('/DeleteUser/:id',auth(endPoints.DeleteUser),UserControllers.DeleteUser)
router.get('/getUserById/:id',auth(endPoints.getUserById),UserControllers.getUserById)
router.get('/searchByName',auth(endPoints.searchByName),UserControllers.searchByName)





export default router;
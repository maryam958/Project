import { Router } from "express";
import * as ProjectController from './controller/project.controller.js'
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./project.endPoint.js";

const router = Router();

//Admin
router.post('/AddProject',auth(endPoints.AddProject),ProjectController.AddProject)
router.put('/UpdateProject/:id',auth(endPoints.UpdateProject),ProjectController.UpdateProject)
router.delete('/DeleteProject/:id',auth(endPoints.DeleteProject),ProjectController.DeleteProject)
router.get('/getAllProjects',auth(endPoints.getAllProjects),ProjectController.getAllProjects)
router.put('/ChangeStatus/:id',auth(endPoints.ChangeStatus),ProjectController.ChangeStatus)

//Technician
router.get('/ViewAssignedProjects',auth(endPoints.ViewAssignedProjects),ProjectController.ViewAssignedProjects)


router.get('/search',auth(endPoints.search),ProjectController.search)

router.get('/checkStartDate',ProjectController.checkStartDate)
router.get('/clientEmail/:projectId',ProjectController.clientEmail)
export default router;
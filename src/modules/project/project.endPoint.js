import { roles } from "../../middleware/auth.js";



export const endPoints={
    AddProject:[roles.Admin],
    UpdateProject:[roles.Admin],
    DeleteProject:[roles.Admin],
    getAllProjects:[roles.Admin],
    ChangeStatus:[roles.Admin],

    ViewAssignedProjects:[roles.Technician],

    search:[roles.Admin,roles.Technician]
}
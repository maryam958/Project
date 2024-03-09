import { roles } from "../../middleware/auth.js";



export const endPoints={
    getAllUsers:[roles.Admin],
    AddUser:[roles.Admin],
    UpdateUser:[roles.Admin],
    DeleteUser:[roles.Admin],
    getUserById:[roles.Admin],
    searchByName:[roles.Admin]
}
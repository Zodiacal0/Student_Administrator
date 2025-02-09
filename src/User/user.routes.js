import { Router } from "express";
import { getUserById , getUsers, deleteUser , updatePassword, updateUser} from "./user.controller.js"; 
import { deleteUserValidator, getUserByIdValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/validators.js";

const router = Router();

router.get(
    "/findUser/:uid",
    getUserByIdValidator,
    getUserById
);

router.get(
    "/",
    getUsers
)

router.delete(
    "/deleteUser/:uid",
    deleteUserValidator, 
    deleteUser
)

router.patch(
    "/updatePassword/:uid",
    updatePasswordValidator,
    updatePassword

)

router.patch(
    "/updateInfoUser/:updateUid/:keyUid",
    updateUserValidator,
    updateUser
)

export default router;
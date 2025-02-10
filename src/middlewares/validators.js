import { body , check } from "express-validator";
import { emailExist, uidExist} from "../helpers/db-validators.js";
import { validationsFields } from "./validatorFiels.js";
import {deleteFileOnError} from "./delete-file-error.js"

export const registerValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("surname").not().isEmpty().withMessage("userName is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("email").custom(emailExist),
    body("card").optional().isLength({max:7}).withMessage("The card must be have 7 characters"),
    body("matters").optional().isMongoId().withMessage("This Id isn't valid"),
    body("role").optional().isIn(["STUDENT_ROLE", "TEACHER_ROLE"]).withMessage("The role must be Student or Professor"),
    validationsFields
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min: 7}).withMessage("The password need have 7 characteres"),
    validationsFields
];

export const getUserByIdValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido"),
    check("uid").custom(uidExist),
    validationsFields,
    deleteFileOnError
];

export const deleteUserValidator = [
    check("uid").isMongoId().withMessage("No es un ID válido"),
    check("uid").custom(uidExist),
    validationsFields,
    deleteFileOnError
];

export const updatePasswordValidator = [
    check("uid").isMongoId().withMessage("No es un Id de Mongo Válido"),
    check("uid").custom(uidExist),
    body("newPassword").isLength({min: 8}).withMessage("La contraseñ a debe tener 8 carácteres"),
    validationsFields,
    deleteFileOnError
];

export const updateUserValidator = [
    check("updateUid").isMongoId().withMessage("This ID isn't valid"),
    check("updateUid").custom(uidExist),
    body("newProfilePicture").optional().isString().withMessage("The newProfilePicture must be String"),
    body("newMatters").optional().isMongoId().withMessage("The Matter ID isn't correct"),
    body("newDay").optional().isIn(["Morning", "Evening"]).withMessage("Only accept Morning, Evening"),
    body("newPhone").optional().isString().withMessage("The Phone must be String"),
    body("role").optional().isIn(["STUDENT_ROLE", "TEACHER_ROLE"]).withMessage("The role must be Student or Professor"),
    validationsFields,
    deleteFileOnError
];

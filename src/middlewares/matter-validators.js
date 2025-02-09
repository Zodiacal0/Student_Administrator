import { body , check } from "express-validator";
import { uidMatterExist } from "../helpers/db-validators.js";
import { uidExist } from "../helpers/db-validators.js";
import {validationsFields} from "..//middlewares/validatorFiels.js"

export const addMatterValidator = [
    body("name").not().isEmpty().withMessage("Name is required"),
    validationsFields
];

export const addUserToMatterValidator = [
    check("uid").not().isEmpty().isMongoId().withMessage("The ID is required"),
    check("uid").custom(uidMatterExist),
    body("userUid").not().isEmpty().isMongoId().withMessage("The ID is required"),
    body("userUid").custom(uidExist),
    validationsFields
];

export const updateInfoMatterValidator = [
    check("uid").not().isEmpty().withMessage("The Matter ID is required").isMongoId().withMessage("Invalid Matter ID format").custom(uidMatterExist),
    body("KeyUserUid").not().isEmpty().withMessage("The User ID is required").isMongoId().withMessage("Invalid User ID format").custom(uidExist),
    body("newName").optional().isLength({min: 5}).withMessage("The Matter must have a name"),    
    body("newDescription").not().isEmpty().withMessage("The Description is required").isLength({ min: 5, max: 64 }).withMessage("The Description must be between 5 and 64 characters"),
    validationsFields,
]
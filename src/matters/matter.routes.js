import { Router } from "express";
import { createMatter , addUserToMatter , updateInfoMatter, deleteMatter, deleteMatterFromUser , getMatter} from "./matter.controller.js";
import { addMatterValidator , addUserToMatterValidator , updateInfoMatterValidator, deleteMatterValidator, deleteUserFromMatterValidator, getMatterIdValidator} from "../middlewares/matter-validators.js";

const router = Router();

router.post(
    "/addMatter",
    addMatterValidator,
    createMatter
);

router.patch(
    "/enrollUser/:uid",
    addUserToMatterValidator,
    addUserToMatter
);

router.patch(
    "/updateInfoMatter/:uid",
    updateInfoMatterValidator,
    updateInfoMatter
)

router.patch(
    "/deleteMatter/:uid",
    deleteMatterValidator,
    deleteMatter
)

router.patch(
    "/deleteUserFromMatter/:uid",
    deleteUserFromMatterValidator,
    deleteMatterFromUser
)

router.get(
    "/getMatters/:uid",
    getMatterIdValidator,
    getMatter
)

export default router;
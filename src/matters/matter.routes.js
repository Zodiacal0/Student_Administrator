import { Router } from "express";
import { createMatter , addUserToMatter , updateInfoMatter} from "./matter.controller.js";
import { addMatterValidator , addUserToMatterValidator , updateInfoMatterValidator} from "../middlewares/matter-validators.js";

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

export default router;
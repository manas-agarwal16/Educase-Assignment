import { Router } from "express";
import { AddSchool, ListSchools } from "../controllers/school.controller.js";

const router = Router();

router.route("/addSchool").post(AddSchool);
router.route("/listSchool/:userLongitude/:userLatitude").get(ListSchools);

export default router;

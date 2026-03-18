import { Router } from "express";
import { getCityTravelInfo } from "../controllers/travelController.js";

const router = Router();

router.get("/", getCityTravelInfo);

export default router;

import express from "express";
import { createNewTrip } from "../../controllers/tripsController";
const router = express.Router();

router.route("/").post(createNewTrip);

export default router;

import express from "express";
import {
  createNewTrip,
  getTripById,
  getTripByUserEmail,
} from "../../controllers/tripsController";
const router = express.Router();

router.route("/").post(createNewTrip).get(getTripByUserEmail);

router.route("/:id").get(getTripById);

export default router;

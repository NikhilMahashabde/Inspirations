import express from "express";
import {
  createNewTrip,
  getTripById,
  getTripsByUserEmail,
  handleDeleteTrip,
} from "../../controllers/tripsController";
const router = express.Router();

router.route("/").post(createNewTrip).get(getTripsByUserEmail);

router.route("/:id").get(getTripById).delete(handleDeleteTrip);

export default router;

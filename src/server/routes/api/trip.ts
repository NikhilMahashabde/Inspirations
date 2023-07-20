import express from "express";
import {
  handleAddTripNode,
  handleDeleteTripNode,
} from "../../controllers/tripController";

const router = express.Router();

router.route("/:id").post(handleAddTripNode).delete(handleDeleteTripNode);

// router.route("/:id/:index")

export default router;

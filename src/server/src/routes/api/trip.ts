import express from "express";
import {
  handleAddTripNode,
  handleDeleteTripNode,
  handleUpdateTripNode,
} from "../../controllers/tripController";

const router = express.Router();

router
  .route("/:id")
  .post(handleAddTripNode)
  .delete(handleDeleteTripNode)
  .put(handleUpdateTripNode);

// router.route("/:id/:index")

export default router;

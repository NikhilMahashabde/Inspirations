import express from "express";
import { handleAddTripNode } from "../../controllers/tripController";

const router = express.Router();

router.route("/:id").post(handleAddTripNode);

export default router;

import express from "express";
import { handleAddTripNodeAI } from "../../controllers/AIController";

const router = express.Router();

router.route("/:id").post(handleAddTripNodeAI);

export default router;

import express from "express";
import { createNewUser } from "../../controllers/usersController";
const router = express.Router();

router.route("/").post(createNewUser);

export default router;

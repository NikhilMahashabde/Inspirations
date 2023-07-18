import express from "express";
import { handleLogin } from "../../controllers/authController";

const router = express.Router();

router.route("/").post(handleLogin);

export default router;

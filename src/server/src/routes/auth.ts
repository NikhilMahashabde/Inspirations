import express from "express";
import { handleJWT } from "../controllers/authController";

const router = express.Router();

router.route("/login").get(handleJWT);

export default router;

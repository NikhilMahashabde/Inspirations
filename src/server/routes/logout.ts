import express from "express";
import handleLogout from "../controllers/logoutController";

const router = express.Router();

router.route("/").post(handleLogout);

export default router;

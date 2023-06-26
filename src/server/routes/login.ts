import express from "express";
const router = express.Router();
import handleLogin from "../controllers/authController";

router.route("/").post(handleLogin);

module.exports = router;

import express from "express";
import validateSession from "../../controllers/sessionsController";
const router = express.Router();

router.route("/").get(validateSession);

export default router;

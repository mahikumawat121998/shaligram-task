import express from "express";
import { room } from "../controllers/room.js";

const router = express.Router();

router.post("/room", room);

export default router;

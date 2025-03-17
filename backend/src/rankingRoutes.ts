//rankingRoutes.ts
import express, { Request, Response, Router } from 'express';
import {
  createStudent,
  addRanking,
  addHistory,
  getRanking,
  getHistoryByStudent,
} from "./rankingController";

const router: Router = express.Router();

router.post("/students", createStudent);
router.post("/ranking", addRanking);
router.post("/history", addHistory);
router.get("/ranking", getRanking);
router.get("/history/:student_id", getHistoryByStudent);

export default router;
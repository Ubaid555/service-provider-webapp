import express from 'express'
import { handleWithdraw, viewBalance, viewPayments, viewWithdrawRequest, withdrawHistory, withdrawRequest } from '../controller/payment.controller.js';

const router = express.Router();

router.get("/viewPayment",viewPayments);

router.get("/viewBalance",viewBalance);

router.post("/withdrawRequest",withdrawRequest);

router.get("/viewWithdrawRequest",viewWithdrawRequest);

router.put("/handleWithdraw",handleWithdraw);

router.get("/withdrawHistory",withdrawHistory)

export default router;
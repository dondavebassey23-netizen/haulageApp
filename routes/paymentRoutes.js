import express from "express";
import { createPayment,uploadManualTransfer,conformStellarPayment,getReciept } from "../controllers/paymentControllers.js";
import { upload } from "../middleware/upload.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createPayment);
paymentRouter.post("/upload-transfer/:orderId", upload.single('proof'), uploadManualTransfer);
paymentRouter.post("/stellar/confirm", conformStellarPayment);
paymentRouter.get("/receipt/:orderId", getReciept); 

export default paymentRouter;

import Order from "../models/order.js";
import crypto from "crypto";
import { STELLAR_SERVER,RECIEVING_WALLET } from "../config/stellar.js";
import { memo } from "react";

export const createPayment = async (req, res) => {

    try {
        const { paymentMethod, amount, items, user } = req.body;

        // generate a memo for stellar
        const memo = "ORD-" + crypto.randomBytes(8).toString("hex").toUpperCase();

        const order = await Order.create({
            amount,
            items,
            user,
            paymentMethod,
            stellarMemo: paymentMethod === 'stellar' ? memo : null,
            stellarWallet: paymentMethod === 'stellar' ? RECIEVING_WALLET : null,
        });

        res.json({
            success: true,
            orderId: order._id,
            memo,
            wallet: RECIEVING_WALLET,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const uploadManualTransfer = async (req, res) => {

    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.proofImage = req.file.path;
        order.status = 'pending'; // Admin must approve
        await order.save();
        res.json({ success: true, message: "Proof of transfer uploaded successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const conformStellarPayment = async (req, res) => {

    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const payments = await STELLAR_SERVER.payments()
            .forAccount(RECIEVING_WALLET)
            .order('desc')
            .limit(20)
            .call();

            let match = null;

            for (const payment of payments.records) {
                if (payment.memo === order.stellarMemo && payment.to === RECIEVING_WALLET && parseFloat(payment.amount) === order.amount) {
                    match = payment;
                    break;
                }

                if (!match) {
                    return res.status(400).json({ success: false, message: "No matching payment found" });
                }

                // Update order
                order.status = 'paid';
                order.stellarTxHash = match.transaction_hash;
                await order.save();

                res.json({ success: true, txHash: match.transaction_hash, message: "Payment confirmed successfully" });
            }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getReciept = async (req, res) => {

    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, 
        order:{
            orderId: order._id,
            amount: order.amount,
            items: order.items,
            status: order.status,
            method: order.paymentMethod,
            txHash: order.stellarTxHash,
            memo: order.stellarMemo,
            date: order.createdAt,
        }
    });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    amount: Number,
    items: Array,
    user: String,


// payment method could be 'credit_card', mannual, stellar

paymentMethod: String,

// MANUAL
proofImage: String,

//STELLAR
stellarMemo: String,
stellarTxHash: String,
stellarWallet: String,

status: {
    type: String,
    default: 'pending', // pending, paid, failed
},

createdAt: {
    type: Date,
    default: Date.now,
},
});

export default mongoose.model('Order', orderSchema);
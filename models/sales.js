import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
  receipt_number: String,
  sale_date: String,
  transaction_time: String,
  sale_amount: Number,
  tax_amount: Number,
  discount_amount: Number,
  round_off: Number,
  net_sale: Number,
  payment_mode: String,
  order_type: String,
  transaction_status: String
});

export default mongoose.model("Sales", SalesSchema);

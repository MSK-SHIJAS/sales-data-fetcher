import axios from "axios";
import Sales from "../models/sales.js";

export const fetchAndSaveSales = async (req, res) => {
  console.log("Controller started...");

  try {
    const response = await axios.get(
      "http://api.petpooja.com/V1/orders/get_sales_data/",
      {
        params: {
          app_key: "srd2neaq1xg7bzc6uyk5jmwv98o4tpfh",
          app_secret: "fd08934c5224af4c975015e599d60a74bf857b4a",
          access_token: "0442e1ee9899bc3806f1a40be490af4ec5c6602a",
          restID: "51wok2zxnsad",
          from_date: "2025-01-20 00:00:00",
          to_date: "2025-01-20 23:59:59"
        },
      }
    );

    console.log(JSON.stringify(response.data, null, 2));

    const orders = response.data?.Records || [];

    if (orders.length === 0) {
      return res.json({
        message: "No sales data found"
      });
    }

    const formatted = orders.map((o) => ({
      receipt_number: o.receipt_no,
      sale_date: o.receipt_date,
      transaction_time: o.transaction_time,
      sale_amount: o.invoice_amount,
      tax_amount: o.tax_amount,
      discount_amount: o.discount_amount,
      round_off: o.round_off,
      net_sale: o.net_sale,
      payment_mode: o.payment_mode,
      order_type: o.order_type,
      transaction_status: o.transaction_status,
    }));

    await Sales.insertMany(formatted);

    return res.json({
      message: "Sales data saved successfully",
      saved: formatted.length,
    });

  } catch (err) {
    console.log("API ERROR >>>", err.message);
    res.status(500).json({ error: err.message });
  }
};

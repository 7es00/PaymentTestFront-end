import React, { useState } from "react";

export default function CheckoutHosted() {
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [order, setOrder] = useState({ amount: 100, currency: "USD" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangeCustomer = e =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleChangeOrder = e =>
    setOrder({ ...order, [e.target.name]: e.target.value });

  const handlePay = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("Starting payment process...");
    try {
      const response = await fetch(
        "https://players-sales.fly.dev/api/v1/payments/create-hosted-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // مهم جدًا
          body: JSON.stringify({
            amount: Number(order.amount), // ضروري يكون رقم
            currency: order.currency,
            customer,
            billing: { address: { country: "EG" } }
          })
        }
      );
      const data = await response.json();

      if (response.ok && data.redirect_url) {
        window.open(data.redirect_url, "_blank");
      } else {
        setError(data.error || "لم يتم الحصول على رابط الدفع.");
        // Console error for debugging
        console.error("API Error:", data);
      }
    } catch (err) {
      setError("حدث خطأ أثناء بدء الدفع.");
      console.error("Network Error:", err);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          padding: 32,
          width: 400,
          maxWidth: "95vw"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#512da8",
            marginBottom: 30
          }}
        >
          دفع عبر Checkout.com (صفحة خارجية)
        </h2>
        <form onSubmit={handlePay}>
          <div style={{ marginBottom: 18 }}>
            <label>اسم العميل</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChangeCustomer}
              required
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                borderRadius: 8,
                border: "1px solid #bbb"
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChangeCustomer}
              required
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                borderRadius: 8,
                border: "1px solid #bbb"
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>المبلغ</label>
            <input
              type="number"
              name="amount"
              value={order.amount}
              onChange={handleChangeOrder}
              required
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                borderRadius: 8,
                border: "1px solid #bbb"
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>العملة</label>
            <input
              type="text"
              name="currency"
              value={order.currency}
              onChange={handleChangeOrder}
              required
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                borderRadius: 8,
                border: "1px solid #bbb"
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(90deg,#512da8 0%,#2196f3 100%)",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: 8,
              padding: "14px 0",
              fontSize: 18,
              marginTop: 16,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1
            }}
            disabled={loading}
          >
            {loading ? "جارٍ تحويلك للدفع..." : "ادفع الآن"}
          </button>
        </form>
        {error && (
          <div
            style={{
              marginTop: 20,
              color: "#c00",
              background: "#ffebee",
              borderRadius: 6,
              padding: 12
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

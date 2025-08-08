import React, { useEffect, useState } from "react";

export default function PaymentResult() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderData = urlParams.get("order");
    const errorMsg = urlParams.get("error");
    const cancelParam = urlParams.get("cancel");

    if (cancelParam) {
      setCancel(true);
    } else if (orderData) {
      try {
        const decoded = atob(orderData);
        setOrder(JSON.parse(decoded));
      } catch {
        setError("❌ خطأ في قراءة بيانات العملية.");
      }
    } else if (errorMsg) {
      setError("❌ فشل الدفع أو لم تكتمل العملية.");
    } else {
      setError("❌ لا يوجد أي بيانات عن العملية.");
    }
  }, []);

  const getStatusMessage = () => {
    if (cancel) {
      return "⚠️ لقد قمت بإلغاء عملية الدفع.";
    }
    if (error) {
      return error;
    }
    if (order) {
      if (["Authorized", "Captured", "Paid"].includes(order.status)) {
        return "✅ تم الدفع بنجاح!";
      } else if (
        ["Declined", "Canceled", "Expired"].includes(order.status)
      ) {
        return "❌ لم يتم الدفع. تم رفض العملية.";
      } else {
        return `⚠️ حالة الدفع: ${order.status}`;
      }
    }
    return "";
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
          padding: 32,
          width: 420,
          maxWidth: "95vw",
          textAlign: "right",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ color: "#512da8", marginBottom: 24, textAlign:"center"}}>نتيجة الدفع</h2>

        <div
          style={{
            marginBottom: 30,
            fontSize: 18,
            color: "#333",
            lineHeight: 1.7,
            minHeight: 100,
          }}
        >
          <div style={{textAlign:"center"}}>{getStatusMessage()}</div>

          {order && (
            <>
              <hr style={{ margin: "16px 0"}} />

              {order.status && (
                <div style={{textAlign:"center"}}>
                  <b>الحالة:</b> {order.status}
                </div>
              )}

              {order.action && (
                <div style={{textAlign:"center"}}>
                  <b>السبب:</b> {order.action}
                </div>
              )}

              {order.userId && (
                <div style={{textAlign:"center"}}>
                  <b>رقم المستخدم:</b> {order.userId}
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          style={{
            background: "linear-gradient(90deg,#512da8 0%,#2196f3 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 20px",
            fontSize: 18,
            cursor: "pointer",
            width: "100%",
          }}
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

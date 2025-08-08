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

    let statusText = "";
    let action = "";
    let ordertext = "";

    if (cancel) {
        statusText = "⚠️ لقد قمت بإلغاء عملية الدفع.";
    } else if (order) {
        if (order.status === "Authorized" || order.status === "Captured" || order.status === "Paid") {
            statusText = "✅ تم الدفع بنجاح!";
        } else if (order.status === "Declined" || order.status === "Canceled" || order.status === "Expired") {

            statusText = order.status;
            action = order.action;
            ordertext = "Payment was not successful.";





        } else {
            statusText = `⚠️ حالة الدفع: ${order.status}`;
        }
    } else if (error) {
        statusText = error;
    }

    return (
        <div style={{
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "20px",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
                padding: 32,
                width: 400,
                maxWidth: "95vw",
                textAlign: "center"
            }}>
                <h2 style={{ color: "#512da8", marginBottom: 30 }}>
                    نتيجة الدفع
                </h2>
                <div style={{ marginBottom: 24, minHeight: 70 }}>
                    {error
                        ? <span>{error}</span> : <span>

                            <nav style={{
                                fontSize: "20px",                           
                            }}>{ordertext}</nav>
                            <br></br>

                           <b> Payment: </b>{statusText}
                            <br></br>
                           <b> Reason:</b> {action} 
                           <b> userid:</b> {order.userId} 

                        </span>
                    }
                </div>
                <button
                    onClick={() => window.location.href = "/"}
                    style={{
                        background: "linear-gradient(90deg,#512da8 0%,#2196f3 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 20px",
                        fontSize: 18,
                        cursor: "pointer"
                    }}
                >
                    العودة للصفحة الرئيسية
                </button>
            </div>
        </div>
    );
}

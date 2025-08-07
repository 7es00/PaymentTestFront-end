import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckoutHosted from "./components/CheckoutHosted";
import PaymentResult from "./components/PaymentResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutHosted />} />
        <Route path="/payment-result" element={<PaymentResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

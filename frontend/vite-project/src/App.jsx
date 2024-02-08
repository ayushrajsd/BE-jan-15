import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function App() {
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const responseObj = await fetch("http://localhost:3000/checkout", {
      method: "POST",
    });
    const paymentResponse = await responseObj.json();
    console.log(paymentResponse);
    const { id, currency, amount } = paymentResponse.data;
    const options = {
      key: "rzp_test_y9KN7luxGUi2Vc", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Acme Corp",
      description: "Test Transaction",
      image: "",
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:3000/verify",
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log("options", options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Payments</h1>
      <a onClick={displayRazorpay} target="_blank">
        Make Payment
      </a>
    </>
  );
}

export default App;

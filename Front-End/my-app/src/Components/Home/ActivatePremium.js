import { Button } from "react-bootstrap";
import axios from "axios";

const ActivatePremium = () => {
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

  const buyPremiumHandler = async () => {
    const result = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    const token = localStorage.getItem("expenseUser");
    if (result) {
      const response = await axios.get(
        "http://localhost:3030/purchase/premiumMembership",
        { headers: { Authorization: token } }
      );
      console.log(response);
      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,

        handler: async function (response) {
          const data = {
            orderCreationId: options.order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "http://localhost:3030/purchase/updateTransaction",
            data,
            { headers: { Authorization: token } }
          );

          console.log(result);
          //   alert(result);
        },

        // handler: async function (response) {
        //   await axios.post(
        //     "http://localhost:3030/purchase/premiumMembership",
        //     {
        //       order_id: options.order_id,
        //       payment_id: response.razorpay_payment_id,
        //     },
        //     { headers: { Authorization: token } }
        //   );

        //   alert("You are a Premium User now");
        // },
      };

      const rzp1 = new window.Razorpay(options);

      //   rzp1.on("payment.submit", (response) => {
      //     paymentMethod.current = response.method;
      //   });
      //   rzp1.on("payment.failed", (response) => {
      //     paymentId.current = response.error.metadata.payment_id;
      //   });

      rzp1.open();
      //   e.preventDefault();
    }
  };

  return <Button onClick={buyPremiumHandler}>Buy Premium</Button>;
};

export default ActivatePremium;

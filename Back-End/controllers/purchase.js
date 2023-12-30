const Razorpay = require("razorpay");
const Order = require("../models/orders");

exports.purchasePremium = (req, res, next) => {
  var rzp = new Razorpay({
    key_id: "rzp_test_67Vm50Ut5rbmf0",
    key_secret: "jOmoAz3CJuSbHAIrZ5RzgKrF",
  });

  try {
    const options = {
      amount: 10 * 100, // amount == Rs 10
      currency: "INR",
    };
    rzp.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      Order.create({
        orderId: order.id,
        paymentId: "Null",
        status: "PENDING",
        userId: req.user.id,
      })
        .then((result) => {
          return res.status(200).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => console.log(err));
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

exports.updateTransaction = (req, res, next) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

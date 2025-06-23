const Razorpay = require('razorpay');

const apiKey = process.env.RAZORPAY_KEY_ID || "rzp_test_NMLRBS6ZXqTKL3"
const apiSecret = process.env.RAZORPAY_KEY_SECRET || "dThYpD36mSpD7iTxkvyvpQGC"

const razorpay= new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
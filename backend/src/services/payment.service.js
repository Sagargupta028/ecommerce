const razorpay = require("../config/razorpayClient.js")

const orderService = require("../services/order.service.js")

const createPaymentLink = async(orderId) =>{
    try {
        const order = await orderService.findOrderById(orderId)

        const paymentLinkRequest = {
            amount:order.totalDiscountedPrice*100,
            currency:"INR",
            customer:{
                name:order.user.firstName + " " + order.user.lastName,
            },
            notify:{
                sms:true,
                email:true
            },
            reminder_enable:true,
            callback_url:`http://localhost:3000/payment/${orderId}`,
            callback_method:"get"
        }

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }
        return resData;

    } catch (error) {
        console.error('Error creating payment link:', error);
        throw new Error(error.message)
    }
}   


const updatePaymentInformation=async(reqData)=>{
    const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    // Fetch order details (You will need to implement the 'orderService.findOrderById' function)
    const order = await orderService.findOrderById(orderId);
    // Fetch the payment details using the payment ID
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === 'captured') {
      order.paymentDetails.paymentId=paymentId;
      order.paymentDetails.status='COMPLETED'; 
      order.orderStatus='PLACED';
      await order.save()
    }
    console.log( 'payment status',order);
    const resData = { message: 'Your order is placed', success: true };
    return resData
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error(error.message)
  }
}

module.exports={
    createPaymentLink,
    updatePaymentInformation
}



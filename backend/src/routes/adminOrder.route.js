const express=require("express");
const authenticate = require("../middleware/authenticate.js");
const router=express.Router();
const orderController=require("../controller/adminOrder.controller.js")

router.get("/",authenticate,orderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,orderController.confirmedOrders);
router.put("/:orderId/ship",authenticate,orderController.shippOrders);
router.put("/:orderId/deliver",authenticate,orderController.deliverOrders);
router.put("/:orderId/cancel",authenticate,orderController.cancelledOrders);
router.delete("/:orderId/delete",authenticate,orderController.deleteOrders);

module.exports = router
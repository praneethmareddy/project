const express = require("express");
const paymentController = require("../controllers/paymentController.js");

const router = express.Router();

router.route("/checkout").post(paymentController.checkout);

router.route("/paymentverification").post(paymentController.paymentVerification);

module.exports = router;


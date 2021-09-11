const express = require('express');
const OrderController = require('../controller/OrderController');

const router = express.Router();

router.post('/place-order', OrderController.placeOrder);

module.exports = router;

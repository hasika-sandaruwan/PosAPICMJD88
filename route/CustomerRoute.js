const express = require('express');
const CustomerController = require('../controller/CustomerController');

const router = express.Router();

router.post('/saveCustomer', CustomerController.saveCustomer);
router.put('/updateCustomer', CustomerController.updateCustomer);
router.delete('/deleteCustomer', CustomerController.deleteCustomer);
router.get('/getCustomer', CustomerController.getCustomer);
router.get('/getAllCustomers', CustomerController.getAllCustomers);

module.exports = router;

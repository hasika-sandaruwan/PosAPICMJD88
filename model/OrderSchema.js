const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    customer: {type: Object, required: true,},
    date: {type: Date, required: true},
    totalCost: {type: Number, required: true},
    items: {type: Array, required: true}
});

module.exports = mongoose.model('Order', OrderSchema);

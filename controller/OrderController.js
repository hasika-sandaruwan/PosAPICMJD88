const OrderSchema = require('../model/OrderSchema');

const placeOrder = (req, resp) => {
    const tempOrder = new OrderSchema({
        customer: req.body.customer,
        date: req.body.date,
        totalCost: req.body.totalCost,
        items: req.body.items
    });
    tempOrder.save().then(result => {
        resp.status(201).json({status: true, message: 'Saved..'})
    }).catch(error => {
        resp.status(500).json(error);
    })
}


module.exports = {
    placeOrder
}








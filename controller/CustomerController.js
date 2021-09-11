const Customer = require('../model/CustomerChema');

/*
* POST--> (save) ->[body]
* PUT--> (update)->[body]
* GET--> (retrieve data)->[headers]
* DELETE-->(remove) ->[headers]
* */

//POST
const saveCustomer = (req, resp) => {
    const tempCustomer = new Customer({
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    tempCustomer.save().then(result => {
        resp.status(201).json({status: true, message: 'Saved..'})
    }).catch(error => {
        resp.status(500).json(error);
    })
}

//PUT
const updateCustomer = (req, resp) => {
    Customer.updateOne(
        {id: req.body.id}, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                salary: req.body.salary
            }
        }
    ).then(result => {
        if (result.nModified>0){
            resp.status(201).json({status: true, message: 'Updated..'})
        }else{
            resp.status(200).json({status: false, message: 'Try Again..'})
        }

    }).catch(error => {
        resp.status(500).json(error);
    })
}

//DELETE
const deleteCustomer = (req, resp) => {
    Customer.deleteOne({
        id: req.headers.id
    }).then(result => {
        if (result.deletedCount>0){
            resp.status(200).json({status: true, message: 'Deleted..'})
        }else{
            resp.status(400).json({status: false, message: 'Try Again..'})
        }

    }).catch(error => {
        resp.status(500).json(error);
    })
}

//GET
const getCustomer = (req, resp) => {
    Customer.findOne({
        id:req.headers.id
    }).then(result => {
        if (result===null){
            resp.status(404).json({status: false, message: 'Empty result..'})
        }else{
            resp.status(200).json({status: true, data: result})
        }

    }).catch(error => {
        resp.status(500).json(error);
    })
}

//GET
const getAllCustomers = (req, resp) => {
    Customer.find().then(result => {
            resp.status(200).json({status: true, data: result})
    }).catch(error => {
        resp.status(500).json(error);
    })
}

module.exports = {
    saveCustomer, updateCustomer, deleteCustomer, getCustomer, getAllCustomers
}








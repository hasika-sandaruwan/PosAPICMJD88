const UserSchema = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = (req, resp) => {
    UserSchema.findOne({email:req.body.email}).then(result=>{
        if (result===null){

            bcrypt.hash(req.body.password, 10, function(err, hash) {

                const dto = new UserSchema({
                    name: req.body.name,
                    contact: req.body.contact,
                    email: req.body.email,
                    password: hash
                });

                dto.save().then(response => {
                    resp.status(201).json({status: true, token: 'empty', message: 'success..'});
                }).catch(onerror => {
                    resp.status(500).json(onerror);
                })

            });
        }else{
            resp.status(400).json({message:'Already Exists'})
        }
    }).catch(error1=>{
        resp.status(500).json(error1);
    })
}

const login = (req,resp)=>{
    UserSchema.findOne({email:req.headers.email}).then(response=>{

        if (response===null){
            resp.status(404).json({message:'Empty Rsult'})
        }else {
            //-----
            bcrypt.compare(req.headers.password, response.password, function(err, result) {
                if (result){
                    resp.status(200).json({status: true, token: 'empty', message: 'success..'});
                }else{
                    resp.status(401).json({status: false, message: 'UnAuthorized..'});
                }
            });
        }

    }).catch(error=>{
        resp.status(500).json(error);
    })
}

module.exports = {
    register, login
}

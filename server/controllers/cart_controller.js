let swag = require('./../models/swag');

module.exports = {
    add: (req, res, next) => {
        if(req.query.id){
            let indexOfItem = req.session.user.cart.findIndex(swag => swag.id === +req.query.id);
            
            if (indexOfItem !== -1) {
                res.status(200).send(req.session.user);
            } else {
                let swagItem = swag.find(swag => swag.id === +req.query.id);
                req.session.user.total += swagItem.price;
                req.session.user.cart.push(swagItem);
                res.status(200).send(req.session.user);
            }
        }
    },
    delete: (req, res, next) => {
        if(req.query.id){
            let swagItem = swag.find(swag => swag.id === +req.query.id);
            let indexOfUnwanted = req.session.user.cart.findIndex(swag => swag.id === +req.query.id);
            req.session.user.cart.splice(indexOfUnwanted, 1);
            req.session.user.total -= swagItem.price;
            
            res.status(200).send(req.session.user); 
        }
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user);
    }
}
let users = require('./../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
        if(req.body.username && req.body.password) {
            users.map((e) => {
                if (e.username === req.body.username && e.password === req.body.password) {
                    req.session.user.username = e.username;

                }
            })
            res.status(200).send(req.session.user);
        } else {
            res.status(500).send('Unauthorized');
        }
    },
    register: (req, res, next) => {
        if(req.body.username && req.body.password) {
            users.push({username: req.body.username, password: req.body.password, id});
            id++;
            req.session.user.username = req.body.username;
            res.status(200).send(req.session.user);
        }
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send( req.session );
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user);
    }

}
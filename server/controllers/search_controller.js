let swag = require('./../models/swag');

module.exports = {
    search: (req, res, next) => {
        let filteredSwag = swag.slice(0);
        if(req.query.category){
            filteredSwag = filteredSwag.filter((e)=> {
                if (e.category === req.query.category){
                    return e;
                }
            })
        }
        res.status(200).send(filteredSwag);
    }
}
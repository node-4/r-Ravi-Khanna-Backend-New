const ObjectId = require("mongoose").Types.ObjectId;

const validId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send({
            message: "Invalid Id",
        });
    }
    next();
};

module.exports = {
    validId,
};

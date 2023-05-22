const User = require("../models/user.model");

const isValidPassword = (password) => {
    // checks password meets requirements
    return password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/
    );
};

const isValidEmail = (email) => {
    // checks valid email format
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};



async function userFields(req, res, next) {
    try {
        const { email, password } = req.body;
        const missingFields = [];
        if (!email) {
            missingFields.push('email');
        }
        const emailExists = await User.findOne({ email: email });

        if (emailExists) {
            return res.status(409).send({ error: 'email is  already registered' });
        }
        if (!isValidEmail(req.body.email)) {
            return res.status(401).send({
                error: "Failed! Not a valid email id",
            });
        }
        // if (!req.body.password) {
        //     return res.status(401).send({ message: "password is required" });
        // }
        if (password && !isValidPassword(req.body.password)) {
            return res.status(401).send({
                error:
                    "password must contain at least one uppercase letter,number,special character and 10 characters long",
            });
        }



        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Required field(s) missing: ${missingFields.join(', ')}` });
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "internal server error " + err.message })
    }
}

const signInBody = async (req, res, next) => {

    if (!req.body.email) {
        return res.status(401).send({ message: "email is required" });
    }
    if (!req.body.password) {
        return res.status(401).send({ message: "password is required" });
    }
    if (!isValidEmail(req.body.email)) {
        return res.status(401).send({
            error: "Failed! Not a valid email id",
        });
    }


    next();
}
module.exports = {
    userFields,
    signInBody

}
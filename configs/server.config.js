if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    // console.log = function () { };
}

module.exports = {
    PORT: process.env.PORT,
};

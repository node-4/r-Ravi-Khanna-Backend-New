const mongoose = require("mongoose");

const kundilSchema = new mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    DOB: {
        type: String
    },
    time: {
        type: String
    },
    place: {
        type: String
    },
    timezone: {
        type: String
    }
})

// pre-save middleware to validate input data
kundilSchema.pre('save', function (next) {
    // check if name, gender, DOB, time, place, and timezone are present
    if (!this.name || !this.gender || !this.DOB || !this.time || !this.place) {
        return next(new Error('name ,gender,date of birth,place,time are required'));
    }

    // perform additional validation checks here
    // ...

    // if validation passes, move on to the next middleware
    next()
})

module.exports = mongoose.model('kundli', kundilSchema);

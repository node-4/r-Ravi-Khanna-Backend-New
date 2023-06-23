const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
        click_id: {
            type: String,
        },
        campaign_id: {
            type: Number,
        },
        campaign_name: {
            type: String,
        },
        publisher_id: {
            type: Number,
        },
        publisher_name: {
            type: String,
        },
        advertiser_id: {
            type: Number,
        },
        advertiser_name: {
            type: String,
        },
        goal_id: {
            type: String,
        },
        goal_name: {
            type: String,
        },
        currency: {
            type: String,
        },
        payout: {
            type: Number,
        },
        revenue: {
            type: Number,
        },
        country: {
            type: String,
        },
        click_ip: {
            type: String,
        },
        os: {
            type: String,
        },
        aff_unique2: {
            type: String,
        },
        click_time: {
            type: Date,
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("trackingData", schema);

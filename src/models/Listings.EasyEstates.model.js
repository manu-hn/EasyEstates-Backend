const { Schema, model } = require('mongoose');

const ListingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },

    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: {
            code: { type: String, required: true },
            location_type: { type: String, enum: ["Residential", "Commercial"] }  // Residential or Commercial
        }
    },
    regularPrice: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    // datePosted: { type: Date, default: Date.now() },
    furnished: { type: Boolean, required: true },
    bathrooms: { type: Number, required: true },
    bedrooms: {
        total: { type: Number, required: true },
        guest: { type: Number, default: 0 },
    },
    parking: { type: Boolean, required: true },

    offer: {
        type: Boolean, required: true
    },
    type: { type: String, required: true },
    imageURLs: {
        type: Array,
        required: true,

    },
    userRef: {
        type: String,
        required: true
    }

}, { timestamps: true });


const ListingModel = model('Listing', ListingSchema);

module.exports = ListingModel;
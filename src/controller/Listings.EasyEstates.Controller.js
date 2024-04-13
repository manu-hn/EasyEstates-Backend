const { StatusCodes: { OK, CREATED, UNAUTHORIZED, NOT_FOUND } } = require('http-status-codes');

const ListingModel = require('../models/Listings.EasyEstates.model.js');

const createListings = async (req, res, next) => {
    try {
        // const { } = req.body;
        // console.log(req.body)
        const newListing = await ListingModel.create(req.body);
        res.status(CREATED).json({ error: false, message: `Listing Created Successfully !`, newListing: newListing });
    } catch (error) {
        next(error);
    }
}

const getListings = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (req?.user?.uid !== id) {
            return res.status(UNAUTHORIZED).json({ error: true, message: `User Not Authorized` })
        } else {

            const listings = await ListingModel.find({ userRef: id });

            return res.status(OK).json({ error: false, total: listings.length, listings })
        }
    } catch (error) {
        next(error);
    }
}
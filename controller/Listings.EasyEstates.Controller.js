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
};

const deleteListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isListingAvailable = await ListingModel.findById({ _id: id });

        if (!isListingAvailable) {
            return res.status(NOT_FOUND).json({ error: true, message: ` Listing Not Found` });
        }

        if (req.user?.uid !== isListingAvailable.userRef) {
            return res.status(UNAUTHORIZED).json({ error: true, message: `You are not Authorized` });
        }

        await ListingModel.findByIdAndDelete({ _id: id });
        return res.status(OK).json({ error: false, message: `Listing Deleted Successfully.` })
    } catch (error) {
        next(error);
    }
};

const updateListings = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isListingAvailable = await ListingModel.findById({ _id: id });


        if (!isListingAvailable) {
            return res.status(NOT_FOUND).json({ error: true, message: ` Listing Not Found` });
        }

        if (req.user?.uid !== isListingAvailable.userRef) {
            return res.status(UNAUTHORIZED).json({ error: true, message: `You are not Authorized` });
        }

        const updatedListing = await ListingModel.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
        return res.status(OK).json({ error: false, message: `Listing Updated Successfully`, updatedListing });
    } catch (error) {
        next(error);
    }
};

const getListingById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const singleListing = await ListingModel.findById({ _id: id });

        if (!singleListing) {
            return res.status(404).json({ error: true, message: ` Listing Not Found` });
        }

        return res.status(200).json({ error: false, singleListing });

    } catch (error) {
        next(error);
    }
};

const fetchAllListings = async (req, res, next) => {
    try {


        const { search, limit, start, offer, furnished, parking, sort, order, type, locationType } = req.query;


        let queryObject = {};

        if (search) {
            queryObject.title = { $regex: search, $options: 'i' };
        }

        if (offer) {
            const finder = offer === 'true' ? true : false
            queryObject.offer = finder;
        }

        if (furnished) {
            const finder = furnished === 'true' ? true : false
            queryObject.furnished = finder;
        }

        if (parking) {
            const finder = parking === 'true' ? true : false
            queryObject.parking = finder;
        }

        if (type && type !== 'all') {

            queryObject.type = type === 'all' ? "" : (type === 'rent' ? 'rent' : 'sale');
        }

        if (locationType) {
            const finder = locationType === 'Residential' ? 'Residential' : 'Commercial';

            queryObject["address.zipcode.location_type"] = finder
        }


        const listings = await ListingModel.find(queryObject).sort({ [sort]: order === 'desc' ? -1 : 1 }).limit(parseInt(limit || 20)).skip(parseInt(start || 0));
        console.log(listings)

        return res.status(OK).json({ error: false, total: listings?.length, listings });
    } catch (error) {
        next(error);
    }

}


module.exports = {
    createListings, getListings, deleteListing, updateListings, getListingById, fetchAllListings
}
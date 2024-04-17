const express = require('express');
const { userAuthByToken } = require('../utils/userAuthentication');
const { createListings, getListings, getListingById, deleteListing, updateListings, fetchAllListings } = require('../controller/Listings.EasyEstates.Controller');




const router = express.Router();

router.post('/listings/create', userAuthByToken, createListings);
router.get('/listings/get-listings/:id', userAuthByToken, getListings);
router.get('/listings/get-listing/:id', getListingById);
router.delete('/listings/delete/:id', userAuthByToken, deleteListing);
router.post('/listings/update/:id', userAuthByToken, updateListings);
router.get('/listings/display-all', fetchAllListings);



module.exports = router;
const express = require('express');
const { userSignup, userLogin,
    userGoogleAuthentication, deleteUserAccount,
    getUserDetails, updateUserDetails, userSignOut } = require('../controller/User.EasyEstates.Controller.js');
const { userAuthByToken } = require('../utils/userAuthentication.js');

const router = express.Router();

router.post('/user/sign-up', userSignup);
router.post('/user/login', userLogin);
router.post('/user/google-auth', userGoogleAuthentication);
router.post('/user/update/:id', userAuthByToken, updateUserDetails);
router.delete('/user/delete/:id', userAuthByToken, deleteUserAccount);
router.get('/user/sign-out', userSignOut);
router.get('/user/:id', userAuthByToken, getUserDetails);



module.exports = router;
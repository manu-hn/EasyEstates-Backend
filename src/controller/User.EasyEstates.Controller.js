const UserModel = require('../models/User.EasyEstates.model.js');
const { StatusCodes: { CREATED, BAD_REQUEST,
    ACCEPTED, NOT_ACCEPTABLE,
    FORBIDDEN, OK, UNAUTHORIZED,
    NOT_FOUND } } = require('http-status-codes');
const { hashPassword, isPasswordValid } = require('../utils/passwordHelper.js');
const { generateToken } = require('../utils/tokenGenerator.js');
const { userDetailsValidate } = require('../utils/userDetailsValidator.js');
const { randomUsernameGenerator, generateRandomPassword } = require('../utils/credentialsHelper.js');
const { sendEmail } = require('../utils/mailHelper.js');




const userSignup = async (request, response, next) => {
    try {

        const { fullName, username, email, mobile, password } = request.body;

        const { value, error } = userDetailsValidate.validate({ fullName, username, email, password, mobile })

        const hashedPassword = await hashPassword(value.password);

        if (error) {
            return response.status(BAD_REQUEST).json({ error: true, message: error.message })
        }
        else {
            const { fullName, username, email, mobile } = value
            await sendEmail(email, fullName);
            const newUser = await UserModel.create({

                fullName,
                username, email, password: hashedPassword, mobile
            });



            return response.status(CREATED).json({
                error: false, statusCode: CREATED, message: 'User created successfully', data: {
                    uid: newUser._id, fullName: newUser.fullName, email: newUser.email, username: newUser.username, avatar: newUser.avatar
                }
            })
        }

    } catch (error) {
        next(error);
    }
}

const userLogin = async (request, response, next) => {
    const { email, password } = request.body;

    try {

        const isUserAvailable = await UserModel.findOne({ email });

        if (!isUserAvailable) {
            return response.status(NOT_FOUND).json({ error: true, statusCode: NOT_ACCEPTABLE, message: `User Not Found !` })
        }

        const isPasswordCorrect = await isPasswordValid(password, isUserAvailable?.password);

        if (isPasswordCorrect) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);
            const token = await generateToken(isUserAvailable._id);
            // console.log("access controller", token)
            // const hashedToken = await passwordHasher(token)
            // console.log("hashed", hashedToken)
            // response.cookie('access_token', hashedToken, {
            //     httpOnly: true,
            //     domain: "localhost",
            //     origin: "http://localhost:5000",
            //     path: "/",
            //     sameSite: "None",
            //     expires: expiryDate,
            //     secure: true,
            // });

            const { password, ...data } = isUserAvailable?._doc;

            response.status(OK)
                .json({
                    error: false, statusCode: OK, message: `Login Successful`, access_token: token, data
                })
        } else {
            response.status(FORBIDDEN).json({ error: true, statusCode: FORBIDDEN, message: `Invalid Password` })
        }

    } catch (error) {
        next(error)
    }
}

const userGoogleAuthentication = async (request, response, next) => {
    try {
        const { email, name, image } = request.body;

        const isUserAvailable = await UserModel.findOne({ email });

        //if user not found
        if (!isUserAvailable) {
            const randomPassword = generateRandomPassword()
            const username = await randomUsernameGenerator(email);
            const hashedPassword = await hashPassword(randomPassword);

            const newUser = await UserModel.create({
                fullName: name,
                username, email, mobile: Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000, password: hashedPassword, avatar: image
            });

            const token = generateToken(username, email);

            response.cookie('accessToken', token, { httpOnly: true, sameSite: "None", path: "/" });
            return response.status(CREATED).json({
                error: false, message: 'User Created Successfully !', access_token: token, data: {
                    uid: newUser._id, fullName: newUser.fullName, email: newUser.email, username: newUser.username, avatar: newUser.avatar
                }
            })

        } else {
            const token = generateToken(isUserAvailable._id, isUserAvailable.email);

            response.cookie('accessToken', token, { httpOnly: true, sameSite: "None", path: "/" });

            response.status(OK).json({
                error: false, statusCode: OK, message: "Login Successful", data: {
                    uid: isUserAvailable._id,
                    username: isUserAvailable.username,
                    email: isUserAvailable.email,
                    avatar: isUserAvailable.avatar
                }
            })


        }


    } catch (error) {
        next(error)
    }
}

module.exports = {
    userSignup, userLogin, userGoogleAuthentication
}
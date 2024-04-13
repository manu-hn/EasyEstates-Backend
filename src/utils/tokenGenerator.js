const Jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();
async function generateToken(uid, username) {
    try {
        const token = await Jwt.sign({ uid, username }, process.env.JWT_SECRET_KEY)
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { generateToken };


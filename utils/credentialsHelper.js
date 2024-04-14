const { generateFromEmail } = require('unique-username-generator');
const { generate } = require('generate-password');
const otpGenerator = require('otp-generator')

function randomUsernameGenerator(email) {
    const username = generateFromEmail(
        email,
        4
    );
    return username;
}


function generateRandomPassword() {

    const password = generate({
        length: 16,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true
    })

    return password
}


function generateOTP() {
    return otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false, digits: true, lowerCaseAlphabets: true });
}

module.exports = {
    randomUsernameGenerator, generateRandomPassword, generateOTP
}

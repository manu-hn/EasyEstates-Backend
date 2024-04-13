const { generateFromEmail } = require('unique-username-generator');
const { generate } = require('generate-password');

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

module.exports = {
    randomUsernameGenerator, generateRandomPassword
}

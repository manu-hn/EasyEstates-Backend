const { createTransport } = require('nodemailer');

const transporter = createTransport({
    service: "Gmail",
    auth: {
        user: "blackdroid.0501@gmail.com",
        pass: "blpxojsdtarujkkp"
    }
});


const sendEmail = async (email, name, password) => {
    const mailOptions = {
        from: "blackdroid.0501@gmail.com",
        to: email,
        subject: "Welcome to Easy Estates",
        html: `<h1>Hello ${name.toUpperCase()} Thank You for registering with EasyEstates, Lets Explore Properties
        <br /> Your Email is ${email} and your password is ${password}. 
        <br /> Do not Share this mail with anyone, It contains information about your account.
        </h1>`
    }

    transporter.sendMail(mailOptions, () => {
        console.log(`E-mail Sent  Successfully to ${email}`);
    })
};


module.exports = {
    sendEmail
}
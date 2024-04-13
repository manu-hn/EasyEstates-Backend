const { connect } = require('mongoose');
const { config } = require('dotenv');
config();

connect(process.env.MONGODB_URL).then(() => {
    console.log(`MongoDB Connected !`)
}).catch((err) => {
    console.log(err)
});
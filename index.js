const express = require('express');
const cors = require('cors');
require('./connection/EasyEstates.connection.js');
const { StatusCodes: { NOT_FOUND } } = require('http-status-codes');
const UserRoutes = require('./routes/User.EasyEstates.routes.js');
const ListingsRoutes = require('./routes/Listings.EasyEstates.routes.js');
const { config } = require('dotenv');
config();


const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
    next();
});

app.use('/api/easy-estates', UserRoutes);
app.use('/api/properties', ListingsRoutes);


app.use('*', (req, res) => {
    res.status(NOT_FOUND).json({ error: true, message: 'Page Not Found !' });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
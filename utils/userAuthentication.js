const Jwt = require('jsonwebtoken');

const userAuthByToken = (request, res, next) => {
    try {

        let token;
        if (request.headers.authorization.includes('Bearer')) {
            token = request.headers.authorization.split(" ")[1];
        } else {

            token = request.headers.authorization
        }


        if (!token) {
            return res.status(401).json({ error: true, message: 'User is Un-Authorized' });

        }

        Jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {

            if (error) return res.status(401).json({ error: true, message: "Forbidden" });
            //User - > userId -> uid
           
            request.user = user;
            next()
        })

    } catch (error) {
        next(error)

    }
}

module.exports = {
    userAuthByToken
}
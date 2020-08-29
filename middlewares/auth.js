const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token')
    if(!token){
        return res.status(401).json({msg: 'No token found. Not authorised'})
    }

    try{
        const verifyToken = jwt.verify(token, config.get('jwtSecret'))
        req.user = verifyToken.user;
        next()
    }catch(error){
       return res.status(401).json({msg: 'Token not valid'})
    }

}
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET} = require("../config");


function userauth(req,res,next){
    const token = req.headers.token
    const decodedData = jwt.verify(token,JWT_USER_SECRET);


    if(decoded){
        req.userId = decodedData.id ///
        next();
    }
    else{
        res.status(403).json({
            message : "you are not signed in"
        })
    }
}


module.exports = {
    userauth : userauth,
}
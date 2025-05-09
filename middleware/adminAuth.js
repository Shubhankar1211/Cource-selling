const jwt = require("jsonwebtoken")
const {JWT_ADMIN_SECRET} = require("../config")


function adminAuth(){
    const token = req.headers.token;
    const decodedAdminData = jwt.verify(token,JWT_ADMIN_SECRET)

    if(decodedAdminData){
          req.userId = decodedAdminData.id
          next();
    }
    else{
        res.status(403).json({
            message : "you are not signed in"
        })
    }
}


module.exports = {
    adminAuth : adminAuth,
}
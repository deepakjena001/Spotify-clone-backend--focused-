const jwt = require("jsonwebtoken");


async function authArtist(req, res, next) {             // middleware always have 3 parameters
    
    const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({message: "unauthorized"})
        }
    
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if(decoded.role !== "artist"){
                return res.status(403).json({ message: "You dont have access."})
            }


            req.user = decoded;    // this is the new property created in req called user


            next()


    
        } catch (err){
            console.log(err);
            return res.status(401).json({message: "Unauthorized"})
        }


}



async function authUser(req, res, next) {
    
    const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({message: "unauthorized"})
        }
    
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if(decoded.role !== "user"){
                return res.status(403).json({ message: "You dont have access."})
            }


            req.user = decoded;    // this is the new property created in req called user


            next()


    
        } catch (err){
            console.log(err);
            return res.status(401).json({message: "Unauthorized"})
        }

}


module.exports = { authArtist, authUser };
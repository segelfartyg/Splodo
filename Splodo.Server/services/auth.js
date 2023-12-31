module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            console.log("authenicated")
          
            return next();
        }
        else{
            res.send("not authenicated")
        } 
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            res.send("authenticated")
        }
        else{
            return next()
        }
    }
}
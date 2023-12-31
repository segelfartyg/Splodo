const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function(passport){
    // passport.use(new GoogleStrategy({
    //     clientID: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackURL: "/google/callback"
    // },
    // async (accessToken, refreshToken, profile, callback) => {
        
    //     const newUser ={
    //         userId: profile.id,
    //         userName: profile.displayName,
    //         firstName: profile.name.givenName
    //     }

    //     try{
    //         let user = await User.findOne({userId: profile.id})

    //         if(user){
            
    //             callback(null, user)
    //         }
    //         else{
                
             
    //             user = await User.create(newUser)
    //             callback(null, user)
    //         }
    //     }
    //     catch(err){
    //         console.log(err)

    //     }

    // }))

    // passport.serializeUser((user,done) => {
    //     console.log(user)
    //     return done(null, user.id)
    // })

    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         return done(err, user)
    //     })
    // })

}


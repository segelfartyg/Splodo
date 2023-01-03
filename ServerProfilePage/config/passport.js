const GoogleStrategy = require("passport-google-oauth20").Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback"
    },
    async (accessToken, refreshToken, profile, callback) => {
        console.log("PROFILEN")
        console.log(profile)
        const newUser ={
            userId: profile.id,
            userName: profile.displayName,
            firstName: profile.name.givenName
        }

        try{
            let user = await User.findOne({userId: profile.id})

            if(user){
            
                callback(null, user)
            }
            else{
                
                console.log(user)
                user = await User.create(newUser)
                callback(null, user)
            }
        }
        catch(err){
            console.log(err)

        }

    }))

    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}


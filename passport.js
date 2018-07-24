const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');

const {JWT_SECRET} = require('./configuration');

//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done)=>{
    try{
        //Find the user specified in the token
        const user = await User.findById(payload.sub);

        //If user doesn't exist it, handle it
        if(!user){
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);

        
    }catch(error){
        done(error, false);
    }
}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done)=>{

    try{
        //Find the user given the email
        const user = await User.findOne({email:email});
        //If not, handle it
        if(!user){
            return done(null, false);
        }

        //Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        //If password not correct, handle it 
        if(!isMatch){
            console.log("Pasword")
            return done(null, false);
        }

        //Otherwise, return the user
        done(null, user);
    }catch(error){
        done(error, false);
    }
    
}));
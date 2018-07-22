const JWT = require('jsonwebtoken');
const User = require("../models/users");
const {JWT_SECRET} = require("../configuration")

signToken = (user) =>{
    return JWT.sign({
        iss: 'Don',
        sub: user._id,
        iat: new Date().getTime(), //gives current date
        exp: new Date().setDate(new Date().getDate()+1) //gives current date + 1 day
    },JWT_SECRET);
}

module.exports = {
    signUp: async(req, res, next) => {
              
       // ***const {email, password } = req.value.body; -- is similar to the two lines below
        const email = req.value.body.email;
        const password = req.value.body.password;
        //check if there exists a user with the provided email

        const userExists = await User.findOne({email:email});
        
        if(userExists){
            return res.status(404).json({
                message: 'email is taken'
            });
        }

        //create a new User
        //***const newUser = new User({email, password}); ES6 syntax
        const newUser = new User({
            email: email,
            password: password
        });

        await newUser.save();
        

        //console.log(newUser);


        //Generate the token using the signToken function above
        const token = signToken(newUser);
        //Respond with a token
        res.status(202).json({token:token});
    },

    signIn: async(req, res, next) => {
        //expecting email and password from user
        

    },

    secret: async(req, res, next) => {
        //expecting token generated from passport
        console.log('I am authorized to be here...');
        res.status(200).json({
            secret: "resource"
        });

    }
}
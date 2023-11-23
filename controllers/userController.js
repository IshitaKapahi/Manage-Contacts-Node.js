const asyncHandler = require("express-async-handler");
const User = require ("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");
//@desc Register a user
//@route Post /api/users/register
//@access public
const registerUser=asyncHandler(async(req,res) =>{
    const{ username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandetory");
    }

    const userAvailable = await User.findOne({ email });

    if(userAvailable){
        res.status(400);
        throw new Error("Email already registered");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hash password :" , hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,

    });
    console.log(`user is created ${user}`);
    if(user){
        res.status(201).json({_id: user.id ,email: user.email});
    } else{
        res.status(400);
        throw new Error ("user data is invalid");
    }


    res.json({message : "Register the user"});
 });




 //@desc login a user
//@route Post /api/users/login
//@access public
const loginUser=asyncHandler(async(req,res) =>{
    const{  email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandetory");
    }

    const user = await User.findOne({email});
    //compare password with hashed password
    if(user && (await bcrypt.compare(password,user.password))){
        
       const accessToken = jwt.sign({
        user:{
            username: user.username,
            email: user.email,
            id: user.id,
        },
       }, 
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn:"15m"}
       ) ;
        res.status(200).json({accessToken});
    } else{
        res.status(401);
        throw new Error("user credentials are incorrect");
    }

    
 });




  //@desc currebt user info
//@route Post /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });


 module.exports = {registerUser , loginUser , currentUser};
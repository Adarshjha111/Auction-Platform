const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs'); //hashing passwords.
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//user signup
router.post(
    '/signup',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
        check('password').isLength({min:7}).withMessage('Password must be at least 7 characters'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const {name, email, password} = req.body;
            //check if the user already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({message: 'User already exists'});   
            }

            //Hash the password
            const hashedPassword = await bcrypt.hash(password,10);//argument '10' is the salt rounds, which determines the complexity of the hashing algorithm.

            //create a new user
            const newUser = new User({name, email, password:hashedPassword});
            await newUser.save();

            res.status(201).json({message: 'User registered successfully'});
        }
        catch(err){
            res.status(500).json({message: 'Failed to register user', error: err.message});
            }
    }
);


// User login
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If the password matches, user is authenticated, generate a JWT token to implement authentication
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

      // Set an HTTP-only cookie containing the email
      res.cookie('userEmail', email, {
        path: '/', // Set the path to the root so it's accessible from all paths
        httpOnly: true, // Set httpOnly for security
      });

      res.cookie('userName', user.name, {
        path: '/', // Set the path to the root so it's accessible from all paths
        httpOnly: true, // Set httpOnly for security
      });
      
      res.status(200).json({ message: 'Logged in successfully', token });
    } catch (err) {
      res.status(500).json({ message: 'Failed to login', error: err.message });
    }
  }
);


module.exports = router;
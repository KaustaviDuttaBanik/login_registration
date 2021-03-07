const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../data/modelUser');
const Employee  = require('../data/modelEmployee');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { registerValidation, loginValidation } = require('../schemaValidation');

//register user
router.post('/Registration', async (req, res) => {
    const validationError = registerValidation(req.body);
    if (validationError.error) {
        return res.status(400).send(validationError.error.details[0].message);
    } else {
        //Check if the user exists in the database
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) return res.status(400).send('Email already exists. Please try with a new email or log in.');
        
        //Check if empId exists in database
        const empIdExist = await Employee.findOne({ empId: req.body.empId })
        if (empIdExist) return res.status(400).send('Employee Id already exists.');
        
        //encrypt the password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        //Registering new user
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: encryptedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        try {
            await user.save();
            const employee = new Employee({
                user: user._id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                empId: req.body.empId,
                organizationName: req.body.organizationName
            });
            try{
                await employee.save();
                res.send({ user: user._id });
            } catch(error) {
                res.status(400).send(error)
            } 
        } catch (err) {
            res.status(400).send(err);
        }
    }
});

//login
router.post('/Login', async (req, res) => {
    const loginValidationError = loginValidation(req.body);
    if (loginValidationError.error) {
        return res.status(400).send(loginValidationError.error.details[0].message);
    };
    
    //check if user exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (!emailExist) return res.status(400).send('Invalid Email');
    
    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, emailExist.password)

    if (!validPassword) return res.status(400).send('Password is incorrect')

    //assigning web token
    const token = jwt.sign({_id: emailExist._id},process.env.TOKEN_SECRET);
    res.header('authorization-token',token).json({
        success: 1,
        message: "login successful",
        token: token
    })
    
});

module.exports = router;
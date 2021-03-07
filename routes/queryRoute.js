const express = require('express');
const router = express.Router();
const userAuth = require('./verification');
const User = require('../data/modelUser');
const Employee = require('../data/modelEmployee');
const { queryValidation } = require('../schemaValidation');

var employeeData = [];
var userData;
var finalArray = [];

router.get('/', userAuth, async (req, res) => {
    //for pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    finalArray = [];
    //sort in ascending order
    function compareAsc(a, b) {
        var field = req.body.sortBy;
        var fieldA, fieldB;
        // Use toUpperCase() to ignore character casing
        if (field !== 'empId') {
            fieldA = a[field].toUpperCase();
            fieldB = b[field].toUpperCase();
        } else {
            fieldA = a[field];
            fieldB = b[field];
        }
        let comparison = 0;
        if (fieldA > fieldB) {
            comparison = 1;
        } else if (fieldA < fieldB) {
            comparison = -1;
        }
        return comparison;
    };
    //sort in descending order
    function compareDesc(a, b) {
        var field = req.body.sortBy;
        var fieldA, fieldB;
        // Use toUpperCase() to ignore character casing
        if (field !== 'empId') {
            fieldA = a[field].toUpperCase();
            fieldB = b[field].toUpperCase();
        } else {
            fieldA = a[field];
            fieldB = b[field];
        }
        let comparison = 0;
        if (fieldA < fieldB) {
            comparison = 1;
        } else if (fieldA > fieldB) {
            comparison = -1;
        }
        return comparison;
    }
    const validationError = queryValidation(req.body);
    if (validationError.error) {
        return res.status(400).send(validationError.error.details[0].message);
    } else {
        //fetch from database
        if (req.body.sortBy)
            if (req.body.sortBy !== "firstName" && req.body.sortBy !== "lastName" && req.body.sortBy !== "email" && req.body.sortBy !== "empId" && req.body.sortBy !== "organizationName") {

                res.status(400).send("Enter a valid field for sorting");
            }

        if (req.body.empId) {
            employeeData = await Employee.find({ empId: req.body.empId })
            userData = await User.findOne({ _id: employeeData[0].user })
            var object1 = {

                _id: userData._id,
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                __v: userData.__v,
                empId: employeeData[0].empId,
                organizationName: employeeData[0].organizationName

            }
            finalArray.push(object1);

        } else if (req.body.firstName && req.body.lastName) {
            employeeData = await Employee.find({ firstName: req.body.firstName, lastName: req.body.lastName })

            for (const i in employeeData) {

                userData = await User.findOne({ _id: employeeData[i].user })
                var object1 = {
                    _id: userData._id,
                    email: userData.email,
                    password: userData.password,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    __v: userData.__v,
                    empId: employeeData[i].empId,
                    organizationName: employeeData[i].organizationName


                }
                finalArray.push(object1);
            }
        } else if (req.body.firstName) {
            employeeData = await Employee.find({ firstName: req.body.firstName })

            for (const i in employeeData) {

                userData = await User.findOne({ _id: employeeData[i].user })
                var object1 = {

                    _id: userData._id,
                    email: userData.email,
                    password: userData.password,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    __v: userData.__v,
                    empId: employeeData[i].empId,
                    organizationName: employeeData[i].organizationName

                }
                finalArray.push(object1);
            }
        } else if (req.body.lastName) {
            employeeData = await Employee.find({ lastName: req.body.lastName })

            for (const i in employeeData) {

                userData = await User.findOne({ _id: employeeData[i].user })
                var object1 = {
                    _id: userData._id,
                    email: userData.email,
                    password: userData.password,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    __v: userData.__v,
                    empId: employeeData[i].empId,
                    organizationName: employeeData[i].organizationName


                }
                finalArray.push(object1);
            }
        }

        if (req.body.sortBy) {
            if (req.body.orderBy === 'Asc') {
                var sortedArray = finalArray.sort(compareAsc);
                if (page && limit) {
                    res.send(sortedArray.slice(startIndex, endIndex))
                } else {
                    res.send(sortedArray)
                }
            } else if (req.body.orderBy === 'Desc') {
                var sortedArray = finalArray.sort(compareDesc);
                if (page && limit) {
                    res.send(sortedArray.slice(startIndex, endIndex))
                } else {
                    res.send(sortedArray)
                }
            } else {
                res.status(400).send("Enter a valid orderBy: 'Asc' or 'Desc'");
            }
        } else {
            if (page && limit) {
                res.send(finalArray.slice(startIndex, endIndex));
            } else {
                res.send(finalArray)
            }
        }
    }


});

module.exports = router;
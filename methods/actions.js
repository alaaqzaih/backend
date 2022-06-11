
var User = require('../models/user')
var Worker = require('../models/workers')

var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const res = require('express/lib/response')

var functions = {
    addNew: function (req, res) {
        console.log(req.body.password);
        console.log(req.body.phonenumber);
        console.log(req.body.name);

        if ((!req.body.name) || (!req.body.password)|| (!req.body.phonenumber)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {

            var newUser = User({
                role : "user",
                name: req.body.name,
                password: req.body.password,
                phonenumber: req.body.phonenumber
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    addNewWorker: function (req, res) {
        console.log(req.body.password);
        console.log(req.body.phonenumber);
        console.log(req.body.name);

        if ((!req.body.name) || (!req.body.password)) {
            res.json({ success: false, msg: 'Enter all fields' })
        }
        else {
            var newWorker = Worker({
                role : "worker",
                name: req.body.name,
                password: req.body.password
           
            });
            newWorker.save(function (err, newWorker) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to save' })
                }
                else {
                    res.json({ success: true, msg: 'Successfully saved' })
                }
            })
        }
    },
    //
    authenticatew: function (req, res) {
        Worker.findOne({
            name: req.body.name
        }, function (err, worker) {
            if (err) throw err
            if (!worker) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                worker.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(worker, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },






    //
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed, User not found' })
            }

            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication failed, wrong password' })
                    }
                })
            }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'Hello ' + decodedtoken.name })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    },
    savelocation: function (req, res) {
        User.findOneAndUpdate(
            { name: req.body.name }, { latitude: req.body.latitude, longitude: req.body.longitude, region: req.body.region }, (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }
            }
        )
        console.log("you are in updated function");
        return res.send({ status: "updated" });
    },
    d_user: function (req, res) {
        User.findOneAndDelete(
            { name: req.body.name }, (err) => {
                console.log(err);
            }
        )
        console.log("deleted successfully");
    }
}


module.exports = functions
/*var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var Worker = require('../models/workers')

var config = require('./dbconfig')

module.exports = function (passportw) {
    console.log("hiii")
    var opts = {}

    opts.secretOrKey = config.secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')

    passportw.use(new JwtStrategy(opts, function (jwt_payload, done) {
        Worker.find({
            id: jwt_payload.id
        }, function (err, workers) {
                if (err) {
                    return done(err, false)
                }
                if (workers) {
                    return done(null, workers)
                }

                else {
                    return done(null, false)
                }
        }
        )
    }
    ))
}*/
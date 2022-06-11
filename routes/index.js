const express = require('express')
const actions = require('../methods/actions')
const user = require('../models/user')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

router.post('/addworker',actions.addNewWorker)


router.post('/adduser',actions.addNew)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

///
router.post('/authenticatew', actions.authenticatew)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)

//save reg, lat,long to database
router.put('/savelocation',actions.savelocation)
//delete user
router.delete('/d_user',actions.d_user)

module.exports = router
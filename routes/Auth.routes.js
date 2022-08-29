const express = require('express');
const router = express.Router();
const { Signup, Signin, UserData, Profile, UpdatePass } = require('./../controllers/Auth.Controller')
const { validSign, validLogin, validProfile, validPass } = require('./../helpers/Validator')

router.post('/signup', validSign, Signup)
router.post('/signin', validLogin, Signin)
router.post('/data', UserData)
router.put('/profile/:id', validProfile, Profile)
router.put('/password/:id', validPass, UpdatePass)

module.exports = router
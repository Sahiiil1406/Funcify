const {signup,
    login,
    logout} = require('../controllers/user.js');
const express = require('express');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// router.get('/',(req,res)=>{res.send()})

module.exports = router;
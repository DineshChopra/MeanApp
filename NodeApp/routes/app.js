var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

/*
// var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.findOne({}, function(err, doc){
        if(err){
            return res.send('Error!');
        }else{
            res.render('node', {email : doc.email});
        }
    })
});
router.post('/user', function(req, res, next){
    let email = req.body.email;
    var user = new User({
        firstName : 'Ram',
        lastName : 'Kumar',
        password : 'Test',
        email : email,
    });
    user.save();
    res.redirect('/');
});
*/
module.exports = router;

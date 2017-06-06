var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Message = require('../models/message');

router.get('/', function(req, res, next){
    Message.find()
            .populate('user', 'firstName')
            .exec(function(err, messages){
                if(err){
                   return res.status(500).json({
                        title : 'An error occured',
                        error : err
                    }); 
                }
                res.status(200).json({
                    message : 'Success',
                    obj : messages
                });
            })
});
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decode){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        else{
            next();
        }
    })
});
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error Occured',
                error : err
            });
        }
        var message = new Message({
            content : req.body.content,
            user : user
        });
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title : 'An error occured',
                    error : err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message : 'Saved Message',
                obj : result
            });
        });
    });
});

router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if(err){
           return res.status(500).json({
                title : 'An error occured',
                error : err
            }); 
        }
        if(!message){
            console.log('Message id is : '+req.params.id);
           return res.status(500).json({
                title : 'No Message Found',
                error : {message : 'Message not found'}
            });  
        }
        if(message != decoded.user._id){
           return res.status(401).json({
                titlev: 'Not Authenticated',
                error : {message : 'Users do not match'}
            }); 
        }

        message.content = req.body.content;
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title : 'An error occured',
                    error : err
                });
            }
            res.status(201).json({
                message : 'Updated Message',
                obj : result
            });
        });
    })
})
router.delete('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message){
        if(err){
           return res.status(500).json({
                title : 'An error occured',
                error : err
            }); 
        }
        if(!message){
            console.log('Message id is : '+req.params.id);
           return res.status(500).json({
                title : 'No Message Found',
                error : {message : 'Message not found'}
            });  
        }
        if(message != decoded.user._id){
           return res.status(401).json({
                titlev: 'Not Authenticated',
                error : {message : 'Users do not match'}
            }); 
        }
        message.remove(function(err, result){
            if(err){
                return res.status(500).json({
                    title : 'An error occured',
                    error : err
                });
            }
            res.status(201).json({
                message : 'Deleted Message',
                obj : result
            });
        });
    })    
});
module.exports = router;
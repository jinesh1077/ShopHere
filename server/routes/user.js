const express = require('express');
const router = express.Router();
const User = require('../models/users');


router.get('/views',(req,res)=>{

  User.find()
  .exec()
  .then(doc =>{
    res.json(doc);
  })
  .catch(err =>{
  console.log(err);
  });

});


router.get('/view/:id', (req,res)=>{

  User.findById(req.params.id)
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving Users");
    }else{
      res.json(doc);
    }
  });
});

router.get('/viewbyemail/:email', (req,res)=>{

  User.find({'email': req.params.email})
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving Users");
    }else{
      res.json(doc);
    }
  });
});

router.get('/logincheck/:email/:password', (req,res)=>{
  email = req.params.email;
  password = req.params.password;
  User.find({'email': email, 'password' : password }, function(err, user) {

    if (err) {
        res.send('2');
    }
    else if (user.length!=0) {

      console.log('Username already exists, email: ' + email);

      res.send('1');

    }else{
      res.send('0');
    }
  });

});

  router.post('/add',(req,res)=>{
    var newUser = new User();
    newUser.name=req.body.name;
    newUser.contact=req.body.contact;
    newUser.email=req.body.email;
    newUser.password=req.body.password;
    newUser.address=req.body.address;
    newUser.save((err,insertedUser)=>{
      if(err){
        console.log('Error saving User');
      }else{
        res.json(insertedUser);
      }
    });

  });


router.put('/update/:id', (req,res)=>{

  User.findByIdAndUpdate(req.params.id,
    {
      $set: {
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address
        }
    },
    {
      new: true
    },(err,updatedUser)=>{
      if(err){
        res.send("Error Updating User");
      }else{
        res.json(updatedUser);
      }
    });

});

router.delete('/remove/:id', (req,res)=>{

  User.findByIdAndRemove(req.params.id,(err,removedUser)=>{
      if(err){
        res.send("Error removing User");
      }else{
        res.json(removedUser);
      }
    });

});



module.exports = router;

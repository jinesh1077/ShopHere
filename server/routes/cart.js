const express = require('express');
const router = express.Router();
const Cart = require('../models/carts');


router.get('/views',(req,res)=>{

  Cart.find()
  .exec()
  .then(doc =>{
    res.json(doc);
  })
  .catch(err =>{
  console.log(err);
  });

});



router.get('/view/:id', (req,res)=>{

  Cart.findById(req.params.id)
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving Users");
    }else{
      res.json(doc);
    }
  });
});

router.get('/viewbyemail/:email/:id', (req,res)=>{

  Cart.find({'email': req.params.email},{'productid': req.params.id})
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving Users");
    }else{
      res.send(doc.qauntity);
    }
  });
});

  router.post('/add',(req,res)=>{
    var newUser = new Cart();
    newUser.email=req.body.email;
    newUser.productid=req.body.productid;
    newUser.qauntity=req.body.qauntity;
    newUser.save((err,insertedUser)=>{
      if(err){
        console.log('Error saving User');
      }else{
        res.json(insertedUser);
      }
    });

  });


router.put('/update/:id', (req,res)=>{

  Cart.findByIdAndUpdate(req.params.id,
    {
      $set: {
        qauntity: qauntity+1,
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

router.put('/updat/:id', (req,res)=>{

  Cart.findByIdAndUpdate(req.params.id,
    {
      $set: {
        qauntity: qauntity-1,
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

  Cart.findByIdAndRemove(req.params.id,(err,removedUser)=>{
      if(err){
        res.send("Error removing User");
      }else{
        res.json(removedUser);
      }
    });

});



module.exports = router;

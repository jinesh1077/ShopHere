const express = require('express');
const router = express.Router();
var fs = require('fs');
const Product = require('../models/products');

router.get('/views',(req,res)=>{

  Product.find()
  .exec()
  .then(doc =>{
    res.json(doc);
  })
  .catch(err =>{
  console.log(err);
  });

});


router.get('/view/:id', (req,res)=>{

  Product.findById(req.params.id)
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving product");
    }else{
      //res.contentType(doc.image.contentType);
      //res.send(doc.image.data);
      res.json(doc);

    }
  });
});


router.get('/viewimg/:id', (req,res)=>{

  Product.findById(req.params.id)
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving product");
    }else{
      //res.contentType(doc.image.contentType);
      res.json(doc.image.data);
      //res.send(doc);

    }
  });
});

router.get('/viewsub/:sub', (req,res)=>{

  Product.find({'sub_category': req.params.sub})
  .exec((err,doc)=>{
    if(err){
      console.log("error retrieving product");
    }else{
      //res.contentType(doc.image.contentType);
      res.json(doc);
      //res.send(doc);

    }
  });
});



  router.post('/add',(req,res)=>{
    var newProduct = new Product();
    newProduct.brand=req.body.brand;
    newProduct.category=req.body.category;
    newProduct.sub_category=req.body.sub_category;
    newProduct.gender=req.body.gender;
    newProduct.image.data=fs.readFileSync(req.body.image);
    newProduct.image.contentType='image/jpg';
    newProduct.price=req.body.price;
    newProduct.description=req.body.description;
    newProduct.save((err,inserted)=>{
      if(err){
        console.log('Error saving User');
      }else{
        res.json(inserted);
      }
    });

  });


router.put('/update/:id', (req,res)=>{

  Product.findByIdAndUpdate(req.params.id,
    {
      $set: {
        brand: req.body.brand,
        category: req.body.category,
        sub_category: req.body.sub_category,
        gender: req.body.gender,
        price: req.body.price,
        description: req.body.description,
        }
    },
    {
      new: true
    },(err,updated)=>{
      if(err){
        res.send("Error Updating Product");
      }else{
        res.json(updated);
      }
    });

});

router.delete('/remove/:id', (req,res)=>{

  Product.findByIdAndRemove(req.params.id,(err,removed)=>{
      if(err){
        res.send("Error removing Product");
      }else{
        res.json(removed);
      }
    });

});



module.exports = router;

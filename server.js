const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');

const db= "mongodb+srv://jinesh1077:jinesh1077@videoplayer-rqzmp.mongodb.net/shophere?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(db,{useNewUrlParser:true});

const user = require('./server/routes/user');
const product = require('./server/routes/product');
const cart = require('./server/routes/cart');


const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/user',user);
app.use('/product',product);
app.use('/cart',cart);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/shophere/index.html'));
});


app.listen(port,function(){
  console.log("Server running on: "+port);
})

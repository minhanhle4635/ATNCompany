const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost::27017/ATNCompany';
//var url = 'mongodb+srv://minhanhle:minhanh123@cluster0-p2f69.gcp.mongodb.net/test?retryWrites=true&w=majority'

router.get('/', async (req,res)=>{
    let client = await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct',{Product:results});
})

router.get('/edit', async(req,res)=>{
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;

    let client= await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    let result = await dbo.collection("Product").findOne({"_id" : ObjectID(id)});
    res.render('editProduct',{product:result});

})

//update SP
router.post('/edit', async(req,res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let color = req.body.color;
    let price = req.body.price;
    let newValues ={$set : {ProductName: name, Color: color, Price:price}};
    var ObjectID = require('mongodb').ObjectID;
    let condition = {"_id" : ObjectID(id)};
    
    let client= await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    await dbo.collection("Product").updateOne(condition,newValues);
    //
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct',{product:results});
})

router.get('/insert',(req,res)=>{
    res.render('insertProduct');
})

router.post('/insert', async (req,res)=>{
    let ProductName = req.body.ProductName;
    let Color = req.body.Color;
    let Price = req.body.Price;

    let client = await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    dbo.collection("Product").insertOne({"ProductName": ProductName,"Color": Color,"Price": Price},(err,res)=>{
        if(err) throw err;
        console.log("Add successfully");
        client.close;
    })
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct',{product:results});
})

router.get('/search',(req,res)=>{
    res.render('searchProduct');
})

router.post('/search',async (req,res)=>{
    let searchSP = req.body.tenSP;
    let client = await MongoClient.connect(url);
    let dbo = client.db("ATNCompany");
    let results = await dbo.collection("Product").find({"ProductName":searchSP}).toArray();
    res.render('Product', {product:results});
})

module.exports = router;
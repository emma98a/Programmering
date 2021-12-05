const express = require('express');
const app = express.Router();
const database = require('../database');
const productModel = require('../models/productModel');
const fs = require('fs');


app.post('/create', (req, res) => {
  const product = new productModel(req.body.id, req.body.product, req.body.price, req.body.category);
  const found = database.findProduct(product);

  if (!found) {
    database.createProduct(product);
    res.status(200).send(true);
  } else {
    res.status(404).send(false);
  }
});


app.get('/create', (req, res)=> {
    fs.readFile('database/product.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
      })
    })


app.put('/create', (req, res)=> {

        let dataArray = JSON.parse(fs.readFileSync('database/product.json')) //gøre det synkront, så denne kode bliver færdig før det andet kører
    
        for (let i = 0; i < dataArray.length; i++) {

            if(dataArray[i].id == req.body.id) {//i'et fortæller bare for loop at den skal køre igennem 1, så 2 , så 3 and so on
                dataArray[i].product = req.body.product
                dataArray[i].price = req.body.price
                dataArray[i].category = req.body.category // her behøver vi ikke atpushe, da vi ændrer det inden i array'et
                fs.writeFile('database/product.json', JSON.stringify(dataArray, null, 4), err => {
                    if(err) res.send(err)
                    res.status(200).json({msg:"Success"}) // ved at bruge res.end, sikrer vi os at den lukker
                //hvis der var flere med det samme id, havde den ændret dem alle sammen til det samme
            })
        }
    }})
    
    app.delete('/create/:id', (req, res)=> { //når man sætter en kolon foran et eller andet, bliver det til en parameter, som vi så ender med at skrive i req.params

        let dataArray = JSON.parse(fs.readFileSync('database/product.json')) //gøre det synkront, så denne kode bliver færdig før det andet kører
    
        for (let i = 0; i < dataArray.length; i++) {

            if(dataArray[i].id == req.params.id) {//i'et fortæller bare for loop at den skal køre igennem 1, så 2 , så 3 and so on
                 // så nu ved vi at der ligger en id som parameter

                 dataArray.splice(i, 1) //vi går ind på index plads 1, hvor mange elementer fra og med index plads 1

                fs.writeFile('database/product.json', JSON.stringify(dataArray, null, 4), err => {
                    if(err) res.send(err)
                    res.status(200).json({msg:"Success"}) // ved at bruge res.end, sikrer vi os at den lukker
                //hvis der var flere med det samme id, havde den ændret dem alle sammen til det samme
            })
        }
    }})

/*
router.get('products/show', (req, res) => {
 
  fs.readFile('database/product.json', function(err, data) {
      if(err) res.send(err)
      res.send(data)
    })
  })
*/
module.exports = app;
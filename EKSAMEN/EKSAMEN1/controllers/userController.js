const express = require('express');
const router = express.Router();
const database = require('../database');
const userModel = require('../models/userModel');

router.post('/login', (req, res) => {
  const user = new userModel(null, req.body.email, req.body.password);
  const found = database.findUser(user);

  if (found) {
    if (user.password == found.password) {
      res.status(200).send(true);
    } else {
      res.status(401).send(false);
    }
  } else {
    res.status(404).send(false);
  }
});

router.post('/create', (req, res) => {
  const user = new userModel(req.body.id, req.body.email, req.body.password);
  const found = database.findUser(user);

  if (!found) {
    database.createUser(user);
    res.status(200).send(true);
  } else {
    res.status(404).send(false);
  }
});



//Get and update or delete user

router.get('/create', (req, res)=> {
  fs.readFile('database/username.json', function(err, data) {
      if(err) res.send(err)
      res.send(data)
    })
  })


router.put('/create', (req, res)=> {

      let userArray = JSON.parse(fs.readFileSync('database/username.json')) //gøre det synkront, så denne kode bliver færdig før det andet kører
  
      for (let i = 0; i < userArray.length; i++) {

          if(userArray[i].id == req.body.id) {//i'et fortæller bare for loop at den skal køre igennem 1, så 2 , så 3 and so on
              userArray[i].email = req.body.email
              userArray[i].password = req.body.password
              
              fs.writeFile('database/username.json', JSON.stringify(userArray, null, 4), err => {
                  if(err) res.send(err)
                  res.status(200).json({msg:"Success"}) // ved at bruge res.end, sikrer vi os at den lukker
              //hvis der var flere med det samme id, havde den ændret dem alle sammen til det samme
          })
      }
  }})
  
  router.delete('/create/:id', (req, res)=> { //når man sætter en kolon foran et eller andet, bliver det til en parameter, som vi så ender med at skrive i req.params

      let userArray = JSON.parse(fs.readFileSync('database/username.json')) //gøre det synkront, så denne kode bliver færdig før det andet kører
  
      for (let i = 0; i < userArray.length; i++) {

          if(userArray[i].id == req.params.id) {//i'et fortæller bare for loop at den skal køre igennem 1, så 2 , så 3 and so on
               // så nu ved vi at der ligger en id som parameter

               userArray.splice(i, 1) //vi går ind på index plads 1, hvor mange elementer fra og med index plads 1

              fs.writeFile('database/username.json', JSON.stringify(userArray, null, 4), err => {
                  if(err) res.send(err)
                  res.status(200).json({msg:"Success"}) // ved at bruge res.end, sikrer vi os at den lukker
              //hvis der var flere med det samme id, havde den ændret dem alle sammen til det samme
          })
      }
  }})



module.exports = router;

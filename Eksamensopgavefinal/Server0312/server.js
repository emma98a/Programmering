//Noter

/*
const express = require('express')
const app = express()
const port = 9000
const fs = require('fs')


//app.use(express.json())// for at få fat på en req.body, altså den gør at noget json bliver tilgængeligt i vores req.body


app.use('/', express.static('views')); // dette gøre at vi ikke behøver at bruge liveserver
app.use('/uploads', express.static('uploads'));
*/

/*

/*
app.get('/', (req, res) => { //request, response
    fs.readFile('database/product.json', function(err, data) {
      if(err) res.send(err)
      res.send(data)
    })
  })
*/


//Create, Update and Delete Products




//Storage



/*
    fs.writeFile('database/username.json', JSON.stringify(req.body, null, 4), err => { //den kører asynkront, kører først når writefile er færdig. den kører en anden rækkeføge en synkoront, som er ligetil og nedad
    if(err) res.send(err)//callback function, error er en parameter. //i body over i index.js, har vi denne stringify json
    res.send({
        mes: "Success"
    })
}) //man skal huske at stringify den, ellers kan den ikke gemmes som json fil
 // det skal være i tuborg klammer det s´man sender tilbage i form af objekt da det nemlig er json
})*/

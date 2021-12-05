const express = require('express')
const app = express()
const port = 9000
const cors = require('cors')
const fs = require('fs')

app.use(cors())
//app.use(express.json())// for at få fat på en req.body, altså den gør at noget json bliver tilgængeligt i vores req.body

const formData = require('express-form-data')
app.use('/', express.static('views'));
app.use('/uploads', express.static('uploads'));


app.listen(port, () => { //sker der noget i local host 3000? det lytter den efter
    console.log(`Example app listening at http://localhost:${port}`)
  })

/*
app.get('/', (req, res) => { //request, response
    fs.readFile('database/product.json', function(err, data) {
      if(err) res.send(err)
      res.send(data)
    })
  })
*/


//Create, Update and Delete Products

app.post('/products', (req, res) => { //request, response
    
    fs.writeFile('database/product.json', JSON.stringify(req.body, null, 4), err => { //den kører asynkront, kører først når writefile er færdig. den kører en anden rækkeføge en synkoront, som er ligetil og nedad
    if(err) res.send(err)//callback function, error er en parameter. //i body over i index.js, har vi denne stringify json
    res.send({
        mes: "Success"
    })
}) //man skal huske at stringify den, ellers kan den ikke gemmes som json fil
 // det skal være i tuborg klammer det s´man sender tilbage i form af objekt da det nemlig er json
})


//Dette er alt sammen array fs, det sådan vi har linket siderne sammen og oprettet en lokal storage i en json fil


const options = {
  uploadDir: './uploads'
}

app.post('/productshomepage', formData.parse(options), (req, res)=> {
  console.log(req.files);
    let dataArray = JSON.parse(fs.readFileSync('database/product.json')) //gøre det synkront, så denne kode bliver færdig før det andet kører

    let thumbnail =  req.files.thumbnail.path.replace('\\', '/');
    console.log(thumbnail)
    let { id, product, price, category } = req.body;
    dataArray.push({ id, product, price, category, thumbnail });

    fs.writeFile('database/product.json', JSON.stringify(dataArray, null, 4), err => {
        if(err) res.send(err)
        res.send({ msg:"Success"})
    })
})

app.get('/productshomepage', (req, res)=> {
    fs.readFile('database/product.json', function(err, data) {
        if(err) res.send(err)
        res.send(data)
      })
    })


app.put('/productshomepage', (req, res)=> {

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
    
    app.delete('/productshomepage/:id', (req, res)=> { //når man sætter en kolon foran et eller andet, bliver det til en parameter, som vi så ender med at skrive i req.params

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
   



//Create, Update and Delete Users


app.get('/', (req, res) => { //request, response
    fs.readFile('database/username.json', function(err, data) {
      if(err) res.send(err)
      res.send(data)
    })
  })



app.post('/users/create', (req, res) => { //her findes der en req.body (post)
    fs.writeFile('database/username.json', JSON.stringify(req.body, null, 4), err => {
        if(err) res.send(err);
        res.send({ msg: 'User Created'});
    })    
})

app.post('/usersarray', (req, res) => { //denne kode fungerer så at det vi smider i vores req.body kommer allerbagerst
    
    let userArray = JSON.parse(fs.readFileSync('database/username.json')); // det er en asynkront function, skriver filesync, da jeg gerne vil have dette kører færdigt inden det andet kommer

    userArray.push(req.body);

    fs.writeFile('database/username.json', JSON.stringify(userArray, null, 4), err => { // istedet for at stringify req.body, så stringify'er vi dette array
        if(err) res.send(err);
        res.send({ msg: 'User Added'});
    })    
})

app.post("/login", (req, res) => {
    const user = new userModel(req.body.email, req.body.password);
    const found = db.findUser(user);
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

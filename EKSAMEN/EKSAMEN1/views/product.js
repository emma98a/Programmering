const signedInUser = localStorage.getItem('user');
if (!signedInUser) {
  location.href = '/login.html';
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('loaded');
    let button = document.getElementById('submit');
  
    button.addEventListener('click', (e) => {
      e.preventDefault();
  
      let productname = document.getElementById('productName').value;
      let productprice = document.getElementById('productPrice').value;
      let productcategory = document.getElementById('productCategory').value;
      
  
      var ProductID = 'id' + Date.now().toString(36);
      let newProduct = {
        id: ProductID,
        product: productname,
        price: productprice,
        category: productcategory,
      };
  
      fetch('http://localhost:9000/products/create', {
        //det bliver dens route
  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
  
        body: JSON.stringify(newProduct), // dette bliver sendt til serveren
      })
        .then((response) => response.json())
        .then((info) => {
          console.log(info);
          location.href = '/product.html';
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    });
  });

  let getAllProducts=document.getElementById("getAllProducts")
  let allProductsdiv = document.getElementById("allProducts")
  
  getAllProducts.addEventListener("click", (e) => {
      e.preventDefault();
      fetch('http://localhost:9000/products/create', {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          },
      })
      .then(response => response.json()) 
          .then(data => {
                 allProductsdiv.innerHTML ="" //man skal medtage denne linje, hvor den er lig ingenting, så den ikke gentager sig selv, altså koden skal tro den er tom
                 data.forEach(element => { //ForEach er et forloop, som kører gennem dem alle
                     allProductsdiv.innerHTML += 
                     "<p> Name: " + element.product + 
                     "/ Price: " + element.price + 
                     "/ Category: " + element.category + 
                     "/ Id: " + element.id + 
                     "</p>"
                 });     
          })
                 
          .catch((error) => {
              console.log('Error:', error)
          })
  })

  let changeProductSubmit = document.getElementById("changeProductSubmit")

changeProductSubmit.addEventListener("click", (e) => {
        e.preventDefault(); //så den ikke laver reload hele tiden

        let productname = document.getElementById("updateProduct").value; //så får vi værdien af objektet
        let uniq= document.getElementById("updateProductId").value; //vi smider et id ind, så vi ved hvilken produkt vi skal opdater
        let productprice = document.getElementById("updateProductPrice").value;
        let productcategory = document.getElementById("updateProductCategory").value;


        let updatedProduct = {
            id: uniq,
            product: productname,
            price: productprice,
            category: productcategory
        }

        fetch('http://localhost:9000/products/create', { //vi vil gerne smide afsted værdien af vores input i Html filen
            method: "PUT", // her bruger vi PUT i steden for
            headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
            }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere

            body: JSON.stringify(updatedProduct)
        }).then(response => response.json()) //sørger for at lave dem om til json
        .then(info => {
            console.log(info)
            location.href = '/product.html';
            alert("Success:" + data.msg)
        })
        .catch((err) => {
            console.log('Error:', err)
        }) //catch er hvis der går noget galt
        
    })

    let deleteProductSubmit = document.getElementById("deleteProductSubmit")

    deleteProductSubmit.addEventListener("click", (e) => {
            e.preventDefault(); //så den ikke laver reload hele tiden
    
            let uniq= document.getElementById("deleteProductId").value; //vi smider et id ind, så vi ved hvilken produkt vi skal opdater
    
            //vi skal ikke bruge porductname, længere da vi bare skal have fat i idøet kun for at slette
            
    
            fetch('http://localhost:9000/products/create/' + uniq, { //vi vil gerne smide afsted værdien af vores input i Html filen
                method: "DELETE", // her bruger vi PUT i steden for
                headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                    'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
                }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere
    
            }).then(response => response.json()) //sørger for at lave dem om til json
            .then(info => {
              console.log(info)
              location.href = '/product.html';
              alert("Success:" + data.msg)
            })
            .catch((err) => {
                console.log('Error:', err)
            }) //catch er hvis der går noget galt
            
        })

        /*

        let getUsers=document.getElementById("getAllUsers")
        let allUsersdiv = document.getElementById("allUsers")
        
        getAllUsers.addEventListener("click", (e) => {
            e.preventDefault();
            fetch('http://localhost:9000/users/create', { //skal måske blive på products??
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json()) 
                .then(data => {
                       allUsersdiv.innerHTML ="" //man skal medtage denne linje, hvor den er lig ingenting, så den ikke gentager sig selv, altså koden skal tro den er tom
                       data.forEach(element => { //ForEach er et forloop, som kører gennem dem alle
                           allUsersdiv.innerHTML += 
                           "<p> Email: " + element.email + 
                           "/ Password: " + element.password + 
                           "/ Id: " + element.id + 
                           "</p>"
                       });     
                })
                .then((response) => response.json())
              .then((info) => {
                console.log(info);
                location.href = '/product.html';
              })
                .catch((error) => {
                    console.log('Error:', error)
                })
        })
      
        let changeUser = document.getElementById("changeUser")
      
        changeUser.addEventListener("click", (e) => {
              e.preventDefault(); //så den ikke laver reload hele tiden
      
              let emailaddress = document.getElementById("updateEmail").value; //så får vi værdien af objektet
              let uniq= document.getElementById("updateUserId").value; //vi smider et id ind, så vi ved hvilken produkt vi skal opdater
              let passwordcode = document.getElementById("updatePassword").value;
      
      
              let updatedUser = {
                  id: uniq,
                  email: emailaddress,
                  password: passwordcode,
              }
      
              fetch('http://localhost:9000/users/create', { //vi vil gerne smide afsted værdien af vores input i Html filen
                  method: "PUT", // her bruger vi PUT i steden for
                  headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                      'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
                  }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere
      
                  body: JSON.stringify(updatedUser)
              }).then(response => response.json()) //sørger for at lave dem om til json
              .then(info => {
                  console.log(info)
                  location.href = '/product.html';
                  alert("Success:" + data.msg)
              })
              .catch((err) => {
                  console.log('Error:', err)
              }) //catch er hvis der går noget galt
              
          })
      
          let deleteUser = document.getElementById("deleteUser")
      
          deleteUser.addEventListener("click", (e) => {
                  e.preventDefault(); //så den ikke laver reload hele tiden
          
                  let uniq= document.getElementById("deleteUserId").value; //vi smider et id ind, så vi ved hvilken produkt vi skal opdater
          
                  //vi skal ikke bruge porductname, længere da vi bare skal have fat i idøet kun for at slette
                  
          
                  fetch('http://localhost:9000/users/create/' + uniq, { //vi vil gerne smide afsted værdien af vores input i Html filen
                      method: "DELETE", // her bruger vi PUT i steden for
                      headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                          'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
                      }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere
          
                  }).then(response => response.json()) //sørger for at lave dem om til json
                  .then(info => {
                    console.log(info)
                    location.href = '/product.html';
                    alert("Success:" + data.msg)
                  })
                  .catch((err) => {
                      console.log('Error:', err)
                  }) //catch er hvis der går noget galt
                  
              })*/
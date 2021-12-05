document.addEventListener("DOMContentLoaded", function() {

    let submit = document.getElementById("submit")

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const form = document.getElementById('submitproductform');
        
        const formData = new FormData(form)

        var uniq = 'id' + Date.now().toString(36)
        formData.append("id", uniq)

        console.log(formData)

        fetch('http://localhost:9000/productshomepage', { //vi vil gerne smide afsted værdien af vores input i Html filen
            method: "POST",
            headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
            }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere

            body: formData
        }).then(response => response.json()) //sørger for at lave dem om til json
        .then(data => {
            console.log(data)
            alert("Success:" + data.msg)
        })
        .catch((err) => {
            console.log('Error:', err)
        }) //catch er hvis der går noget galt
        
    })
})

let getAllProducts=document.getElementById("getAllProducts")
let allProductsdiv = document.getElementById("allProducts")

getAllProducts.addEventListener("click", (e) => {
    e.preventDefault();
    fetch('http://localhost:9000/productshomepage', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json()) 
        .then(data => {
               allProductsdiv.innerHTML ="" //man skal medtage denne linje, hvor den er lig ingenting, så den ikke gentager sig selv, altså koden skal tro den er tom
               data.forEach(element => { //ForEach er et forloop, som kører gennem dem alle
                   allProductsdiv.innerHTML += "<p> Name: " + element.product + "/ Price: " + element.price + "/ Category: " + element.category + "/ Id: " + element.id + "</p>"
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

        fetch('http://localhost:9000/productshomepage', { //vi vil gerne smide afsted værdien af vores input i Html filen
            method: "PUT", // her bruger vi PUT i steden for
            headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
            }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere

            body: JSON.stringify(updatedProduct)
        }).then(response => response.json()) //sørger for at lave dem om til json
        .then(data => {
            console.log(data)
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
            
    
            fetch('http://localhost:9000/productshomepage/' + uniq, { //vi vil gerne smide afsted værdien af vores input i Html filen
                method: "DELETE", // her bruger vi PUT i steden for
                headers: { // hvis modulet cors skal virke, skal ens headers være i orden
                    'Content-Type': 'application/json' // så ved serveren at det der kommer er en eller anden JSON objekt
                }, //der skal altid være et komma inden du går videre til næste key (for at vise at den ikke er en del af headers). Mine keys her er headers, body med mere
    
            }).then(response => response.json()) //sørger for at lave dem om til json
            .then(data => {
                console.log(data)
                alert("Success:" + data.msg)
            })
            .catch((err) => {
                console.log('Error:', err)
            }) //catch er hvis der går noget galt
            
        })


/* Denne metode er hvad der fandtes før fetch, ovenstående er fetch -  det er bare 2 forskellige måder at gøre det på
var xhttp = new XMLHttpRequest(); //variabelen har nu adgang til en masse metoder grundet . mAN kan bruge denne metode eller fetch metode, forkalr hvorfor du har valgt hvilken

        xhttp.onreadystatechange = function (){ // det er den function der skal "handle hvad der sker"
                if (this.readyState ==4 && this.status ==200) { //hvis readystate ender på 4, så sker der et eller andet

                    alert(xhttp.responseText)
                }
        }

        xhttp.open("GET", "http://localhost:9000", true) //nu har vi forbundet den til vores local host så vi kan sætte en server op
        xhttp.send()
        */
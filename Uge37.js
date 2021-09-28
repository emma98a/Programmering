//recap fra basis uge 1
let minalder = '23'
//console.log(minalder)
//console.log('Min alder er ' + minalder)
//min har printet min alder i ovenstående kode
function printalder(nummer) {
        return console.log('Min alder er ' + nummer)
}
//console.log(printalder(30))
/* -> dette fører til at en sektion bliver kommentar
//Basis 2 opgave: Funktioner
function spanskehilsener(hilsen= 'Buenas Tardes'){
    console.log(`${hilsen} Emma`)
}
spanskehilsener('hej')
spanskehilsener()
*/ 
// Opgave 2 - øl
//antal øl per kasse
/*
var kasser = 30
function antaløl(kasser,x){
    console.log(kasser*x)
}
antaløl(kasser,5)
function prisenforøl(x){
    return antaløl(kasser,x)*(120/30);
};
prisenforøl(kasser,5)
/*
//pris pr kasse
var pris = 120
function totalpris(pris,a){
    console.log(pris*a)
};
totalpris(pris,5)
*/
//ovenstående kan gøres mere simpelt :')


// Opgave 3 - plante har brug for vand
/*
function plantvand(day){
    if (day=='onsdag')
    return true;
    if (day!='onsdag') 
    return false;
}
*/ // eller du kan bruge nedenstående kode, som er en andelse mere simpelt
/*
function plantvand(day){
    if (day=='onsdag')
    return true;
    else
    return false;
}
console.log(plantvand('onsdag')) //true
console.log(plantvand('torsdag')) //false
*/
// for neden: skriv det med const og arrow function, uden tuborg klammer
/*
const plantvand = (day) => 
    day === 'onsdag' ? true : false;
console.log(plantvand('onsdag'))

const plantvand1 = (day) => 
    day === 'onsdag' ? false : true
console.log(plantvand1('onsdag'))
*/

//Opgave 4 : Arrays - indkøbsliste
const indkøbsliste = ["gulerødder","mælk","sukker","kaffe","toiletpapir"]
//indkøbsliste.shift() //fjerner den første som er gulerødder
//console.log(indkøbsliste.slice(2)) slicer alt op til sukker
//console.log(indkøbsliste.splice(2))
//.splice(2) //OBS OBS, hvis du sætter ';', så virker det ikke bare at skrive ".splice(2)"
//.unshift("pasta") // tilføjer nummer til total antal
//console.log(indkøbsliste)

//Opgave 5 : Objekter
let pung = {
    kort:
    [{
        udbyder: "Danske Bank",
        Udløbsdato : "03/52"
    },
{
    udbyder: "Nordea",
    Udløbsdato: "05/66"
},
{
    udbyder: "Americo",
    Udløbsdato: "02/34"
}],
kontanter:{
    værdi: "20",
    antal: "3"
},
{
    
}


}
}
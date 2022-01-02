const produits = document.getElementById('produits');
const totalPanier = document.getElementById('total');
const commande = document.getElementById('commande');
const errorForm = document.getElementById('errorForm');
let nbProduits = 0;
let total =0;
products = [];
//---------------vérifier si le panier est vide-------------------------------------
if(!localStorage.getItem('products')){
    produits.innerHTML = "Votre panier est vide";
}
//----------si le panier n'est pas vide, vérifier de nombre de produits--------------
else{
    nbProduits = parseInt(localStorage.getItem('products'));
    while (nbProduits != 0) {
        ours = JSON.parse(localStorage.getItem('product'+nbProduits));
        ligneProduit = document.createElement('div');
        ligneProduit.className = 'ligneProduit';
        produits.appendChild(ligneProduit);
        prixEnEuros = ours.prix /100;
        ligneProduit.innerHTML = 
            `<div class="nomOurs">- ${ours.nom}</div>
             <div class="prixOurs">${prixEnEuros} €</div>
             <div class="idOurs">${ours.id}</div>
             <div class="couleurOurs">${ours.couleur}</div>`
        total += prixEnEuros;
        products.push(ours.id);
        nbProduits--;
    }
    totalPanier.innerHTML ='total: ' +total+' €';
}
commande.addEventListener('click',(event)=>{
    event.preventDefault();
    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value,
    }
    if(contact.firstName==""||contact.lastName==""||contact.address==""||
        contact.city==""||contact.email==""){
        errorForm.textContent = "vous devez remplir tous les champs";
        return;
    }
    errorForm.textContent = "";
    const contactProducts={contact,products};
    fetch('http://localhost:3000/api/teddies/order',{
        method:'POST',
        body:JSON.stringify(contactProducts),
        headers: { "Content-Type" : "application/json" }
    })
    .then(reponse =>reponse.json())
    .then(data=>console.log(data))
    .catch(e=>console.log(e));
})
let inputs = document.querySelectorAll('input');
inputs.forEach(input =>
    input.addEventListener('input',(e)=>{
    switch(e.target.id){
        case "prenom":
        case  "nom":
        case "ville":prenomNomVilleChecker(e.target.value,e.target.id);
            break;
        case "adresse":adresseChecker(e.target.value,e.target.id);
            break;
        case "email":emailChecker(e.target.value,e.target.id);
            break;
        }           
    }));
    
const displayError = (inputId,message,valid)=>{
    const elementId = document.getElementById(inputId);
    const divError = document.querySelector("."+inputId+" > div");
    if(!valid){
        divError.textContent=message;
        elementId.classList.add('error');
    }
    else{
        divError.textContent=message;
        elementId.classList.remove('error');
    }
}
const prenomNomVilleChecker = (value,inputId) =>{
    if(value.length == 0){
        displayError(inputId,"");
    }
    else if(value.length >0 && (value.length <3 ||value.length >20)){
        displayError(inputId,"3 caractères min et 20 maximum");
    }
    else if(!value.match(/^[a-zA-Z\-]+$/)){
        displayError(inputId,"ne doit pas contenir de chiffres ou de caractères spéciaux");
    }
    else{
        displayError(inputId,"",true);
    }
}
const adresseChecker = (value,inputId) =>{
    if(value.length == 0){
        displayError(inputId,"");
    }
    else if(!value.match(/^[a-z0-9\s,'-]*$/i)){
        displayError(inputId,"ne doit pas contenir de caractères spéciaux");
    }
    else{
        displayError(inputId,"",true);
    }
}
const emailChecker = (value,inputId) =>{
    if(value.length == 0){
        displayError(inputId,"");
    }
    else if(!value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        displayError(inputId,"email non valide");
    }
    else{
        displayError(inputId,"",true);
    }
}


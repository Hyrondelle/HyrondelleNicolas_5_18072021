const produits = document.getElementById('produits');
const totalPanier = document.getElementById('total');
const commande = document.getElementById('commande');
const errorForm = document.getElementById('errorForm');
let nbProduits;
let total=null;
let products = [];
//vérifie si le panier est vide et sinon affiche les produits sélectionnés
const panier = () =>{
    if(!localStorage.getItem('products')){
        nbProduits = 0;
        produits.textContent = "Votre panier est vide";
    }
    else{
        produits.textContent = "";
        nbProduits = parseInt(localStorage.getItem('products'));
        for(let i=nbProduits;i>0;i--){
            let ours = JSON.parse(localStorage.getItem('product'+i));
            let ligneProduit = document.createElement('div');
            ligneProduit.className = 'ligneProduit';
            produits.appendChild(ligneProduit);
            let prixEnEuros = ours.prix /100;
            ligneProduit.innerHTML = 
                `<div class="nomOurs">- ${ours.nom}</div>
                 <div class="prixOurs">${prixEnEuros} €</div>
                 <div class="idOurs">${ours.id}</div>
                 <div class="couleurOurs">${ours.couleur}</div>`
            total += prixEnEuros;
            products.push(ours.id);
            totalPanier.innerHTML ='total: ' +total+' €';
        }
    }    
}
panier();
//au click rempli l'objet contact
commande.addEventListener('click',(event)=>{
    event.preventDefault();
    let contact = {
        firstName: document.getElementById('prenom').value,
        lastName: document.getElementById('nom').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('ville').value,
        email: document.getElementById('email').value,
    }
    //renvoi une erreur si un champ est vide
    if(contact.firstName==""||contact.lastName==""||contact.address==""||
        contact.city==""||contact.email==""){
        errorForm.textContent = "vous devez remplir tous les champs";
        return;
    }
    errorForm.textContent = "";
    //envoi la commande au serveur
    const contactProducts={contact,products};
    fetch('http://localhost:3000/api/teddies/order',{
        method:'POST',
        body:JSON.stringify(contactProducts),
        headers: { "Content-Type" : "application/json" }
    })
    .then(reponse =>reponse.json())
    .then(data=>{
        //si ok, envoi dans le localestorage, efface les produits et envoi sur la page confirm
        localStorage.setItem('order',JSON.stringify(data))
        deleteStorage();
        window.location.replace('./confirm.html')
        })
    .catch(e=>console.log(e));
})
//vérifie le champ ou se trouve l'utilisateur et redirige sur la bonne regex
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
//affiche 1 erreur si un champ est mal renseigné et passe en rouge l'input    
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
//vérifie le prénom, le nom et la ville, renvoi true si ok
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
//vérifie l'adresse et renvoi true si ok
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
//vérifie l'email et renvoi true si ok
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
//efface les donées du localstorage
const deleteStorage = () =>{
    while (nbProduits != 0){
        localStorage.removeItem('product'+nbProduits);
        nbProduits--;
    }
    localStorage.removeItem('products');
}

 
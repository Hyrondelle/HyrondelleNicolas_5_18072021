const produits = document.getElementById('produits');
const totalPanier = document.getElementById('total');
const commande = document.getElementById('commande');
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
const firstName=  document.getElementById('prenom');
firstName.addEventListener('input',(e)=>{
    console.log(e.target.value);
})

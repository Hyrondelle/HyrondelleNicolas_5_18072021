const produits = document.getElementById('produits');
let nbProduits = 0;
let total =0;
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
        ligneProduit.innerHTML = 
            `<div class="nomOurs">${ours.nom}</div>
             <div class="prixOurs">${ours.prix}</div>
             <div class="idOurs">${ours.id}</div>
             <div class="couleurOurs">${ours.couleur}</div>`
        total += ours.prix;
        console.log(total);
        nbProduits--;
    }
}
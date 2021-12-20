const nbProduitsPanier = document.getElementById('nbProduitsPanier');

if(!localStorage.getItem('products')){
    nbProduitsPanier.innerHTML = 0;
}
else{
    nbProduitsPanier.innerHTML = parseInt(localStorage.getItem('products'));
}
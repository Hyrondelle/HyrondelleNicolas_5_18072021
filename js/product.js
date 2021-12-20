const url = "http://localhost:3000/api/teddies/";
const recupId = window.location.search.slice(1);
const product = document.getElementById('product');
const container = document.querySelector('.container');
let oursData =[];
const nomProduitOurs = document.getElementById('nomProduitOurs');
const photoProduitOurs = document.getElementById('photo');
const descriptionProduitOurs = document.getElementById('description');
const choice =document.getElementById('color-select');
const prixOurs =document.getElementById('prix');
const envoiPanier =document.getElementById('sentPanier');
let objetEnvoyeAuPanier = null;

//------récupération des données de l'ours---------
const getDataOurs = async () =>{
    await fetch(url+recupId)
        .then((rep) => 
            rep.json())
        .then((data) => (
            oursData = data))
        .catch((e) => {     //affichage message si probleme server
            console.log(e)
            container.textContent = "aucun produit disponible pour le moment";
            product.style.display = "none";
        });   
        console.log(oursData);      
} 
//------------affichage des données de l'ours----------
const displayDataOurs = async () =>{
    await getDataOurs();
    nomProduitOurs.textContent = oursData.name;
    photoProduitOurs.innerHTML = `<img src=${oursData.imageUrl} height="300px" width= "350px">`;
    descriptionProduitOurs.textContent = oursData.description;
    for(let c of oursData.colors){
        choice.innerHTML += `<option>${c}</option>`  
    }
    prixOurs.textContent = oursData.price/100 +" €";
}
displayDataOurs();

function sendToCart(){
//-------------------creation de l'objet à envoyer au panier-----------------
    envoiPanier.addEventListener('click',(event)=>{
        event.preventDefault();
        objetEnvoyeAuPanier = {
            'nom':oursData.name,
            'prix':oursData.price,
            'id':recupId,
            'couleur':choice.value
        }
        if(choice.value=="0"){
            alert("Vous devez choisir une couleur");
        }
//-------------vérification si panier vide et création du premier produit
        else if(!localStorage.getItem('products')){
            localStorage.setItem('products','1');
            localStorage.setItem('product'+localStorage.getItem('products'),JSON.stringify(objetEnvoyeAuPanier));
            document.getElementById('nbProduitsPanier').innerHTML = 1;
            productSendToCart.textContent = "produit ajouté au panier";
            const myTimeout = setTimeout(stopDisplay, 3000);
        }
        else{
//----------rajout de produits au panier----------------------------
            let nbObjet =JSON.parse(localStorage.getItem('products'))
            nbObjet++;
            localStorage.setItem('products',JSON.stringify(nbObjet));
            localStorage.setItem('product'+localStorage.getItem('products'),JSON.stringify(objetEnvoyeAuPanier));
            document.getElementById('nbProduitsPanier').innerHTML = nbObjet;
            productSendToCart.textContent = "produit ajouté au panier";
            const myTimeout = setTimeout(stopDisplay, 3000);
        }
    })
}
sendToCart();

function stopDisplay(){
    productSendToCart.textContent = "";
}

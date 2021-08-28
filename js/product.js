const recupId = window.location.search;
const idNounours = recupId.slice(1);
const product = document.getElementById('product');
const nomProduitOurs = document.getElementById('nomProduitOurs');
const photoProduitOurs = document.getElementById('photo');
const descriptionProduitOurs = document.getElementById('description');
const choice =document.getElementById('color-select');
const prixOurs =document.getElementById('prix');
const envoiPanier =document.getElementById('sentPanier');
let objetEnvoyeAuPanier = null;

//--------------recupération et affichage de l'ours-------------
fetch("http://localhost:3000/api/teddies/"+idNounours)
    .then((rep) => 
        rep.json())
    .then((data) =>{
        console.log(data);
        photoOurs = data.imageUrl;
        nom = data.name;
        nomProduitOurs.innerHTML = data.name;
        photoProduitOurs.innerHTML = `<img src=${photoOurs} height="300px" width= "350px">`;
        description = data.description;
        descriptionProduitOurs.innerHTML = description;
        colors = data.colors;
        for(let c of colors){
            choice.innerHTML += `<option>${c}</option>`  
        }
        tarif = data.price / 100;
        prixOurs.innerHTML = tarif +" €";

        //-------------------creation de l'objet à envoyer au panier-----------------
        envoiPanier.addEventListener('click',(event)=>{
            event.preventDefault();
            objetEnvoyeAuPanier = {
                'nom':data.name,
                'prix':data.price,
                'id':idNounours,
                'couleur':choice.value
            }
            if(choice.value=="0"){
                alert("Vous devez choisir une couleur");
            }
            //-------------vérification si panier vide et création du premier produit
            else if(!localStorage.getItem('products')){
                localStorage.setItem('products','1');
                localStorage.setItem('product'+localStorage.getItem('products'),JSON.stringify(objetEnvoyeAuPanier));
            }
            else{
                //----------rajout de produits au panier----------------------------
                let nbObjet =JSON.parse(localStorage.getItem('products'))
                nbObjet++;
                localStorage.setItem('products',JSON.stringify(nbObjet));
                localStorage.setItem('product'+localStorage.getItem('products'),JSON.stringify(objetEnvoyeAuPanier));
            }
        })  
    })
    

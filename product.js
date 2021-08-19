const recupId = window.location.search;
const idNounours = recupId.slice(1);
const product = document.getElementById('product');
const nomProduitOurs = document.getElementById('nomProduitOurs');
const photoProduitOurs = document.getElementById('photo');
const descriptionProduitOurs = document.getElementById('description');
const choice =document.getElementById('color-select');
const prix =document.getElementById('prix');

fetch("http://localhost:3000/api/teddies/"+idNounours)
    .then((rep) => 
        rep.json())
    .then((data) =>{
        console.log(data);
        photoOurs = data.imageUrl;
        nomProduitOurs.innerHTML = data.name;
        photoProduitOurs.innerHTML = `<img src=${photoOurs} height="300px" width= "350px">`;
        description = data.description;
        descriptionProduitOurs.innerHTML = description;
        colors = data.colors;
        for(let c of colors){
            choice.innerHTML += `<option>${c}</option>`  
        }
        prixOurs = data.price / 100;
        prix.innerHTML = prixOurs +" €";
    })

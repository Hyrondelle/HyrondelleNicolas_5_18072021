
const url = "http://localhost:3000/api/teddies";
const allOurs = document.getElementById('products');
const errorServer = document.getElementById('error');
const card = document.createElement('div');
console.log(allOurs)
                     //affichage des produits
fetch(url)
    .then((rep) => 
         rep.json())
    .then((data) => {
        try{
            for(let i=0;i<=data.length;i++){  
                oursName = data[i].name;
                photo = data[i].imageUrl;
                carteOurs = document.createElement("div");
                carteOurs.className ='ours';
                allOurs.appendChild(carteOurs);
                carteOurs.innerHTML += `<img src=${photo} height="200px" width= "250px">`;
                nomOurs = document.createElement("p")
                carteOurs.appendChild(nomOurs);
                nomOurs.innerHTML += oursName;
            }  
        }
        catch(e){
            console.log(e);
        }      
    })
    .catch((e) => {     //affichage message si probleme server
        console.log(e)
        errorServer.innerHTML = "aucun produit disponible pour le moment"
    });
                    //affichage d'un produit    
    allOurs.addEventListener('click',() => {
        card.id ='card';
        document.body.appendChild(card);
        card.appendChild(nomOurs);
    })              //fermeture page produit
    card.addEventListener('click',()=>{
        card.remove();
    })
    

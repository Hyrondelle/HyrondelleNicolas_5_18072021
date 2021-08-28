
const url = "http://localhost:3000/api/teddies/";
const allOurs = document.getElementById('products');
const errorServer = document.getElementById('error');
const card = document.createElement('div');

                     //affichage des produits
                     
fetch(url)
    .then((rep) => 
         rep.json())
    .then((data) => {
        try{
            for(let i=0;i<=data.length;i++){  
                oursName = data[i].name;
                photo = data[i].imageUrl;
                idOurs = data[i]._id;
                carteOurs = document.createElement("div");
                carteOurs.className ='ours';
                allOurs.appendChild(carteOurs);
                carteOurs.innerHTML += `<img src=${photo} height="200px" width= "250px">`;
                nomOurs = document.createElement("p");
                nomOurs.className = 'oursName';
                carteOurs.appendChild(nomOurs);
                nomOurs.innerHTML += oursName;
                carteOurs.addEventListener('click',()=>{
                    console.log(idOurs);
                    fetch(url,[idOurs])
                        .then((repe) => 
                             repe.json())
                        .then((dataa) => {
                            ourson = dataa[i];
                            
                            console.log(dataa[i]._id);
                            window.location.replace('./html/produits.html?'+dataa[i]._id);
                            
                    })
                })
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
      
    

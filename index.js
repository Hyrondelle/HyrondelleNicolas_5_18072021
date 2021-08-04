
const url = "http://localhost:3000/api/teddies";
const imgOurs = document.getElementById('image');
const nameOurs = document.getElementById('name');

console.log(imgOurs)

fetch(url)
    .then((rep) => 
         rep.json())
    .then((data) => {
        try{
            for(let i=0;i<=data.length;i++){  
                let name = data[i].name;
                 let photo = data[i].imageUrl;
                 imgOurs.innerHTML += `<img src=${photo} height="200px" width= "250px">`;
                 const p = document.createElement("p")
                 imgOurs.appendChild(p);
                 p.innerHTML += name;
            }  
        }
        catch(e){
            console.log(e);
        }      
    })
    .catch((e) => {
        console.log(e)
        nameOurs.innerHTML = "aucun produit disponible pour le moment"
    });

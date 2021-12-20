
const url = "http://localhost:3000/api/teddies/";
const allOurs = document.getElementById('products');
const errorServer = document.getElementById('error');
let dataOurs = [];
                     //récupération des données
const getData = async () =>{
    await fetch(url)
        .then((rep) => 
            rep.json())
        .then((data) => (
            dataOurs = data))
        .catch((e) => {     //affichage message si probleme server
            console.log(e)
            errorServer.innerHTML = "aucun produit disponible pour le moment"
        });   
    console.log(dataOurs);   
}  
              //affichage des données
const diplayData = async () =>{
    await getData();
    allOurs.innerHTML = dataOurs.map((ours) =>
    `
    <li class="ours">
        <img src=${ours.imageUrl} height="200px" width= "250px">
        <p class="oursName">${ours.name}</p>
        <p class="idOurs">${ours._id}</p>
    </li>
    `
    ).join("");
}
               //redirige vers la page de l'ours sélectionné
const clickOurs = async () =>{
    await diplayData();
    const lis = document.querySelectorAll('.ours');
    console.log(lis);
    lis.forEach(li => {
        li.addEventListener('click',(e)=>{
        window.location.replace('./html/produits.html?'+e.path[1].lastElementChild.textContent);
        })
    });
}
clickOurs();

 
 
 

      
    

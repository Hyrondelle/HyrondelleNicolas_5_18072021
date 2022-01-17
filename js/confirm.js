const order = JSON.parse(localStorage.getItem('order'));
const displayOrder = document.querySelector('.order > p');
const orderTarif = order.products;
console.log(order);
console.log(order.contact.firstName);
let totalPrice = null;

const displayPrice = () => {
    for(let i=orderTarif.length;i>0;i--){
        totalPrice += orderTarif[i-1].price / 100;
    }
}
if(orderTarif.length > 1){
    displayPrice();
    }
else{
    totalPrice = orderTarif[0].price / 100;
}
displayOrder.textContent = "Votre commande n° "+order.orderId+" est d'un montant de "
+totalPrice+"€";

localStorage.removeItem('order');


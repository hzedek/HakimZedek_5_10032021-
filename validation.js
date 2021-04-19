const greetings = document.getElementById('greetings');s
let product = JSON.parse(localStorage.getItem("localstorage_product"));
let contact =JSON.parse(localStorage.getItem("contact"));
let total = JSON.parse(localStorage.getItem("cart_total"));
let orderId = JSON.parse(localStorage.getItem("orderId"));

//AFFICHAGE DE LA PAGE VALIDATION

greetings.innerHTML=`<h1 class="center">Merci pour votre commande ${contact.firstName+" "+contact.lastName} </h1>
<H3 class="center">Order id numero <strong>${orderId}</strong> pour un total panier de <strong>${total}€</strong></H3>
`;
//vider le localStorage
localStorage.removeItem("product");
localStorage.removeItem("orderId");
localStorage.removeItem("contact");
localStorage.removeItem("cart_total");
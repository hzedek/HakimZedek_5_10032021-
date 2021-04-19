//affichage du nombre d'article dans le panier 

let incart_number = JSON.parse(localStorage.getItem("number_product"));
const theNumbers = document.getElementById("cartnumber");

if (incart_number>=1) {
    theNumbers.innerHTML = incart_number;  
}


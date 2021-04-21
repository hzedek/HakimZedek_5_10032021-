let product = JSON.parse(localStorage.getItem("localstorage_product"));
let cart_items = localStorage.getItem('product');
cart_items = JSON.parse(cart_items);

const theNumbers = document.getElementById("cartnumber");
const id_cart_html = document.getElementById('cart_product_display');
const btn_cart_html = document.getElementById('btn-primary');
const totalArticle = document.getElementsByClassName('totalArticleHTML');

//AFFICHAGE SI PANIER VIDE
if (cart_items === null || cart_items.length === 0) {
    const empty_cart = `<div>
<h2>Votre panier est vide</h2>
</div>`;

    id_cart_html.innerHTML = empty_cart;
    this.number_article(cart_items);
}
//AFFICHAGE DU PANIER SI UN ARTICLE OU PLUS
else {
    Object.values(cart_items).map(element => {
        id_cart_html.innerHTML += `<article class="container-fluid row my-2 product">
        <img class=" col-md-3" src="${element.image}" alt="${element.nom}">
        <p class="col-md-2 my-auto center"><strong> ${element.nom} en ${element.optionchoisie} </strong></p>
        <p class=" col-md-1 my-auto">${element.prix}€</p>
        <div class="my-auto mx-auto col-md-2 row">
            <i class="fas fa-arrow-left down" data-id="${element.nom + element.optionchoisie}"></i>
            <p class="my-auto item_amount mx-3">${element.quantity}</p>
            <i class="fas fa-arrow-right up" data-id="${element.nom + element.optionchoisie}"></i>
        </div>
        <p class="col-md-2 my-auto"> <span class="totalArticleHTML"></span>€</p>
        <button data-id="${element.nom + element.optionchoisie}" class="btn btn-danger my-auto mx-auto col-md-2 btn_delete">supprimer</button>
    </article>`;
    })
    this.articleTotalPrice(cart_items);
    this.cartTotalPrice(cart_items);
    this.removeItem(cart_items);
    this.number_article(cart_items);
    this.removeAllItems(cart_items);
};

//FONCTION POUR LE PRIX TOTAL D'UN PRODUIT EN FONCTION DE LA QUANTITÉ
function articleTotalPrice(cart_items) {
    let item = Object.values(cart_items);

    for (let x = 0; x < totalArticle.length; x++) {
        let total_article = item[x].prix * item[x].quantity;
        totalArticle[x].innerHTML = total_article;
    }
};

//FONCTION POUR LE PRIX TOTAL DU PANIER
function cartTotalPrice(cart_items) {
    let item = Object.values(cart_items);
    const total = item.reduce((currentTotal, item) => {
        return (item.prix * item.quantity) + currentTotal
    }, 0);
    btn_cart_html.innerHTML = ` 
    
    <h2 class=" mx-4 mt-1">Total panier : ${total} €</h2>
    <a href="survey.html"><button class="btn btn-primary mx-4 mt-2">Commander</button></a>
    <button class="btn btn-danger mx-4 mt-2" id="btn-delete">Vider panier</button>`;
    let cart_total = [];
    cart_total.push(total)
    localStorage.setItem("cart_total", JSON.stringify(cart_total));
};

//INCRÉMENTATION DE LA QUANTITÉ AU CLICK +1
let up = document.querySelectorAll(".up");
let amount_up = [...up];

amount_up.forEach(button => {

    button.addEventListener("click", event => {

        let add_amount = event.target;
        let id = add_amount.dataset.id
        let new_amount = Object.values(cart_items).find(element => element.nom + element.optionchoisie === id);
        new_amount.quantity = new_amount.quantity + 1;

        localStorage.setItem("product", JSON.stringify(cart_items));
        this.articleTotalPrice(cart_items);
        this.cartTotalPrice(cart_items);
        this.number_article(cart_items);
        add_amount.previousElementSibling.innerText = new_amount.quantity;


    });
});

//DECREMENTATION DE LA QUANTITÉ AU CLICK -1

let down = document.querySelectorAll(".down");
let amount_down = [...down];

amount_down.forEach(button => {

    button.addEventListener("click", event => {

        let remove_amount = event.target;
        let id = remove_amount.dataset.id;
        let new_amount = Object.values(cart_items).find(element => element.nom + element.optionchoisie === id);
        if (new_amount.quantity >= 2) {
            new_amount.quantity = new_amount.quantity - 1;
            localStorage.setItem("product", JSON.stringify(cart_items));
            this.number_article(cart_items);
            this.articleTotalPrice(cart_items);
            this.cartTotalPrice(cart_items);
            remove_amount.nextElementSibling.innerText = new_amount.quantity;
        }

    });
});

//FONCTION QUI RETIRE UN ARTICLE DU PANIER

function removeItem(cart_items) {
    let item = Object.values(cart_items);
    let btn_deleteHTML = document.querySelectorAll('.btn_delete');
    let btn_delete = [...btn_deleteHTML];

    btn_delete.forEach(button => {

        button.addEventListener("click", event => {
            let the_delete_button = event.target;
            let id = the_delete_button.dataset.id;
            deleteItem(id);
            this.cartTotalPrice(cart_items);
            localStorage.setItem("product", JSON.stringify(item));
            this.number_article(cart_items);
            window.location.href = "cart.html";
        });
        function deleteItem(id) {
            item = item.filter(item => item.nom + item.optionchoisie != id)
        };

    });
};
//FONCTION QUI VIDE LE PANIER
function removeAllItems(cart_items) {
    const delete_all = document.getElementById('btn-delete');

    delete_all.addEventListener("click", e => {
        e.prevaultDefault;
        localStorage.removeItem("product");
        localStorage.removeItem("number_products");
        window.location.href = "cart.html";
    })
}

//FONCTION QUI CALCULE LE NOMBRE D'ARTICLE ET QUE L'AFFICHE DANS L'ICON PANIER DE LA NAV
function number_article(cart_items) {
    if (cart_items === null || cart_items === undefined) {
        let number_product = [0];
        localStorage.setItem("number_product", JSON.stringify(number_product));
        theNumbers.innerHTML = number_product;
    }
    else {
        let item = Object.values(cart_items);
        number_products = item.reduce((myNumber, item) => {
            return myNumber + item.quantity
        }, 0);
        let number_product = [];
        number_product.push(number_products)
        localStorage.setItem("number_product", JSON.stringify(number_product));
        theNumbers.innerHTML = number_product;
    }
};


let product_of_localStorage = JSON.parse(localStorage.getItem("localstorage_product"));
console.log(product_of_localStorage);

const id_cart_html = document.getElementById('cart_produt_display')

if (product_of_localStorage === null) {
    const empty_cart = `<div>
<h2>Votre panier est vide</h2>
</div>`;

    id_cart_html.innerHTML = empty_cart;
}
else {
    for (let k = 0; k < product_of_localStorage.length; k++) {
        const element = product_of_localStorage[k];
        const cart_display = `
    <section class="container-fluid row">
                <img class=" col-4" src="${element.image}" alt="${element.nom}">
                <div class="col-4 my-auto text-center">
                    <p> ${element.nom}</p>
                    <p> option choisie : ${element.optionchoisie}</p>
                </div>
                <div class="my-auto mx-auto col-4"><i class="fas fa-chevron-up"></i>
                    <p class="my-auto mx-auto item-amount">${element.quantity}</p><i class="fas fa-chevron-down"></i>
                </div>
            </section>
            <section class="container-fluid row mt-5 mx-1">
                <h4>total article : ${element.prix}<span class="cart-total"></span> €</h4>
            </section>`;
        id_cart_html.innerHTML += cart_display;
    };

}
//----------------affichage du panier---------------
let my_response2 = fetch(`http://localhost:3000/api/furniture/${id_selector}`);


my_response2.then(
    async data => {
        const the_localStorage = data.json();
        await the_localStorage.then(data => {
            
            const id_btn = document.getElementById("btn");
           id_btn.addEventListener("click", (event) => {
                const id_form = document.getElementById("option_product");
                const option_chosen = id_form.value;

                let productCart = {
                    image: data.imageUrl,
                    nom: data.name,
                    prix: data.price / 100,
                    optionchoisie: option_chosen,
                    quantity: 0,
                    id: data._id
                };
                let product = JSON.parse(localStorage.getItem("localstorage_product"));
                setItems(productCart);

            });

        })
    })
    //creation du localstorage pour les produits
function setItems(productCart) {
    
    let cart_items = localStorage.getItem('product');
    cart_items = JSON.parse(cart_items);

    if (cart_items != null) {
        if (cart_items[productCart.nom + productCart.optionchoisie] == undefined) {
            cart_items = {
                ...cart_items, [productCart.nom + productCart.optionchoisie]: productCart
            }
        }
        cart_items[productCart.nom + productCart.optionchoisie].quantity += 1;
    }

    else {
        productCart.quantity = 1;
        cart_items = { [productCart.nom + productCart.optionchoisie]: productCart };
    }
    localStorage.setItem("product", JSON.stringify(cart_items));
    number_article(cart_items)
};
//fonction affichage et incrémentation du nombre d'article
function number_article(cart_items) {
     let item = Object.values(cart_items);
        number_products= item.reduce((myNumber, item)=> {
                return myNumber + item.quantity},0);
        let number_product=[];
        number_product.push(number_products)
        localStorage.setItem("number_product", JSON.stringify(number_product));
        theNumbers.innerHTML = number_product; 

};
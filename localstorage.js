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
                    quantity: 0
                };
                let product_of_localStorage = JSON.parse(localStorage.getItem("localstorage_product"));

                setItems(productCart);

            });

        })
    })

function setItems(productCart) {

    let cart_items = localStorage.getItem('product_of_localStorage');
    cart_items = JSON.parse(cart_items);

    if (cart_items != null) {
        if (cart_items[productCart.nom + productCart.optionchoisie]== undefined) 
        {   cart_items={...cart_items,[productCart.nom + productCart.optionchoisie]:productCart
            }
        }
      cart_items[productCart.nom + productCart.optionchoisie].quantity += 1;
    }

    else {
        productCart.quantity = 1;
        cart_items = { [productCart.nom+ productCart.optionchoisie]: productCart };
    }
    localStorage.setItem("product_of_localStorage", JSON.stringify(cart_items));
};



/* if (product_of_localStorage) {
        if (product_of_localStorage) {
            product_of_localStorage.push(productCart);
        localStorage.setItem("localstorage_product",JSON.stringify(product_of_localStorage));
        } else {
            console.error("again");
        }

    }
    else {
        product_of_localStorage =[];
        product_of_localStorage.push(productCart);
        localStorage.setItem("localstorage_product",JSON.stringify(product_of_localStorage));

    } */
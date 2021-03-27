//----------------affichage du panier---------------
let my_response2 = fetch(`http://localhost:3000/api/furniture/${id_selector}`);


my_response2.then(
    async data => {
        const the_localStorage = data.json();
        await the_localStorage.then(data => {

            const id_btn = document.getElementById("btn");
    id_btn.addEventListener("click", (event) => {
    event.preventDefault();
    const id_form = document.getElementById("option_product");
    const option_chosen = id_form.value;

    let productCart = {
        image: data.imageUrl,
        nom: data.name,
        prix: data.price / 100,
        optionchoisie: option_chosen,
        quantity: 1
    };
    
    let product_of_localStorage = JSON.parse(localStorage.getItem("localstorage_product"));

    if (product_of_localStorage) {
        product_of_localStorage.push(productCart);
        localStorage.setItem("localstorage_product",JSON.stringify(product_of_localStorage));
    } 
    else {
        product_of_localStorage =[];
        product_of_localStorage.push(productCart);
        localStorage.setItem("localstorage_product",JSON.stringify(product_of_localStorage));
        
    }
});

        })
    })

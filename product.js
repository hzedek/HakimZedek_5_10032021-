
const product = document.getElementById("product");


//----------------récuperer le id de URL---------------   
const querystring_url_id = window.location.search;
const id_selector = querystring_url_id.slice(1);
let my_response = fetch(`http://localhost:3000/api/furniture/${id_selector}`);

window.onload = () => {
    getOneProduct();
}

function getOneProduct() {
    my_response.then(
        async data => {
            const myproducts = data.json();
            await myproducts.then(data => {
//----------------affichage d'un produit---------------            
                 productDisplay = `
                                        <img class="col-md-6 scaledown" height="300" width="400" src="${data.imageUrl}" alt="${data.name}">
                                            <div class="col-md-6">
                                                <h2 class="text-center">${data.name}</h2>
                                                <p class="text-center">${data.description}</p>
                                                <p> Prix: ${data.price / 100} € </p>
                                                <form><select name="option_product" id="option_product">
                                                    <label for="option_product"></label>
                                                    </select>
                                                </form>                                            
                 </div>`;
                product.innerHTML = productDisplay;
//----------------affichage des options---------------                 
                for (let i = 0; i < data.varnish.length; i++) {
                     option_display =
                        `<option value="${data.varnish[i]}">${data.varnish[i]}
                    </option>`
                    document.getElementById("option_product").innerHTML += option_display;
                }
                
            }
            );
        }
    )
};
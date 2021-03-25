
const product = document.getElementById("product");


const querystring_url_id = window.location.search;
const id_selector = querystring_url_id.slice(1);




window.onload = () => {
    getOneProduct();
}

function getOneProduct() {
let my_response = fetch(`http://localhost:3000/api/furniture/${id_selector}`)
my_response.then(
    async data =>{
         const myproducts = data.json();
         await myproducts.then(data => {
             
             let productDisplay = `
                                        <img class="col-md-6 scaledown" height="300" width="400" src="${data.imageUrl}" alt="${data.name}">
                                            <div class="col-md-6">
                                                <h2 class="text-center">${data.name}</h2>
                                                <p class="text-center">${data.description}</p>
                                                <p> Prix: ${data.price /100} € </p>
                                                <form><select name="option_product" id="option_product">
                                                    <label for="option_product"></label>
                                                    </select>
                                                </form>
                                                <boutton class="btn btn-primary my-5">Ajouter au panier</boutton>
                                            
                 </div>`;

                 product.innerHTML = productDisplay;
                 
                 for (let i = 0; i < data.varnish.length; i++) {
                    let option_display = 
                    `<option value="option${[i]}">${data.varnish[i]}
                    </option>`
                    document.getElementById("option_product").innerHTML += option_display;
                }
         }
     );
 }
)}


/*
let _id = [];
let names = [];
let description = [];
let price = [];
let imageUrl = [];
let option0 = [];
let option1 = [];
let option2 = [];

data.forEach((my_response,i) => {
                 _id[i]=my_response._id;
                 names[i]=my_response.name;
                 description[i]=my_response.description;
                 price[i]=my_response.price;
                 imageUrl[i]=my_response.imageUrl;
                 option0[i]=my_response.varnish[0];
                 option1[i]=my_response.varnish[1];
                 option2[i]=my_response.varnish[2];
             });
             */
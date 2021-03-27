const products = document.getElementById("products");
 //----------------affichage des produits---------------  
function getProducts() {
    
    const promise1 = fetch('http://localhost:3000/api/furniture')
        
    promise1.then(
           async data =>{
                const myproducts = data.json();
                await myproducts.then(
                    data => {
                        for (let i = 0; i < data.length; i++){
                            let display = `<div class="card rounded mx-auto my-5">
                            <img class="card-img-top scaledown" src="${data[i].imageUrl}" alt="${data[i].name}">
                            <div class="card-body">
                            <a href="produit.html?${data[i]._id}" class="stretched-link"><h5 class="card-title text-center">${data[i].name}</h5></a> 
                            </div>
                            `
                            products.innerHTML += display;
                        }
                    }
                );
            }
        )
    }

window.onload = () => {
    getProducts();
}
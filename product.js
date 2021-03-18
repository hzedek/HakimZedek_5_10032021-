const products = document.getElementById("product");

/*
const request = new XMLHttpRequest();
request.onload = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const results = JSON.parse(this.responseType)
            renderHTML(results)      
};
function renderHTML(){
    product.innerHTML('price')
};
request.open('GET','http://localhost:3000/api/furniture','true');
request.send();
*/


    fetch('http://localhost:3000/api/furniture')
    .then(res => res.json());
    .then(console.log);

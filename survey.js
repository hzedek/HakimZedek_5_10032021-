let product = JSON.parse(localStorage.getItem("localstorage_product"));
const btn_send = document.getElementById("btn_send");
let cart_items = localStorage.getItem('product');
cart_items=JSON.parse(cart_items);
let storage_items = Object.values(cart_items);


        btn_send.addEventListener("click" , event=>{
            event.preventDefault();
//CREATION DE LA KEY CONTACT POUR LOCALSTORAGE
                const contact = {
                    firstName:document.getElementById('prenom').value,
                    lastName:document.getElementById('nom').value,
                    address:document.getElementById('adresse').value,
                    city:document.getElementById('city').value,
                    email:document.getElementById('email').value,
                }

                localStorage.setItem("contact" , JSON.stringify(contact));
                let my_contact = localStorage.getItem('contact');
                my_contact=JSON.parse(my_contact);
//AFFICHAGE DU MESSAGE D'ERREUR SI FORMULAIRE INCOMPLET                
                let error;
                const my_regex=/[a-zA-Z]+/;

                if (my_contact.email==="") {
                    error = "Veuillez renseigner votre email";
                }

                if (my_contact.city==="") {
                    error = "Veuillez renseigner votre ville";
                }

                if (my_contact.address==="") {
                    error = "Veuillez renseigner votre adresse";
                }
                
                if (my_contact.lastName==="") {
                    error = "Veuillez renseigner votre nom";
                }
                
                if (my_contact.firstName==="") {
                    error = "Veuillez renseigner votre prenom";
                }
                if(my_regex.test(my_contact.city)===false){
                    error = "ville incorrecte";
                }
                if(my_regex.test(my_contact.lastName)===false){
                    error = "nom incorrecte";
                }
                if (my_regex.test(my_contact.firstName)===false) {
                    error = "prenom incorrecte";
                }
                

                if (error) {
                    event.preventDefault();
                    document.getElementById("errors").innerHTML = error;
                }
//INITIALISATION DES DONNÉES A ENVOYER AU BACKEND                
                else{
            let products = [];
            if (localStorage.getItem('product') !== null) {
                let cart_item = JSON.parse(localStorage.getItem('product'));
                
                storage_items.forEach( answer => {
                    products.push(answer.id);
                })
            }
        
            let contactItems = JSON.stringify({
                contact, products
            })
                
            
            
            postOrder(contactItems);
        
            
//Envoi des données du formulaire + le ou les id(s) : requête POST //
        function postOrder(contactItems) {
        
            fetch("http://localhost:3000/api/furniture/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode:'cors',
                body: contactItems
            }).then(response => {
                return response.json();
        
            })
// Enregistre les infos du formulaire + id + total panier pour l'afficher dans la page validation.html //
            .then( res => {
                localStorage.setItem('contact', JSON.stringify(res.contact));
                localStorage.setItem('orderId', JSON.stringify(res.orderId));
                localStorage.removeItem('product');
                localStorage.removeItem("number_product");
                window.location.replace("./validation.html");
            })
            }
        }
        });
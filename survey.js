const btn_send = document.getElementById("btn_send");

btn_send.addEventListener("click" , event=>{
    event.preventDefault();

    const survey_to_send = {
        firstName:document.getElementById('prenom').value,
        surName:document.getElementById('nom').value,
        address:document.getElementById('adresse').value,
        city:document.getElementById('city').value,
        email:document.getElementById('email').value,
    }
    localStorage.setItem("survey_to_send" , JSON.stringify(survey_to_send))
})
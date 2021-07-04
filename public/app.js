let cerrar = document.querySelector(".cerrar");
let abrirchat = document.querySelector(".chat");
let popup = document.querySelector(".popup");
let popupC = document.querySelector(".popup-contenedor");
let nombrePac = document.getElementById("nombrePac");
let apellidoPac = document.getElementById("apellidoP");
let cedulaP = document.getElementById("documentoP");
const textopopup = document.getElementById("texto");



abrirchat.addEventListener("click",function(e){
    e.preventDefault();
    if (nombrePac.value==""){
        alert("Debe Ingresar el Nombre del Paciente");
        nombrePac.focus();
    } else {
        if (apellidoPac.value==""){
            alert("Debe Ingresar el Apellido del Paciente");
            apellidoPac.focus();
        } else {
            if (cedulaP.value==""){
                alert("Debe Ingresar el Documento del Paciente");
                cedulaP.focus();
            } else {
                //le mando como parametro el nombre del Usuario
                window.location.href = `/chat.html?nombrePac=${nombrePac.value}`;
                
                
            }
        }
    
    }
    
});


cerrar.addEventListener("click",function(){
    popup.classList.toggle("popup-cerrar");
   
    setTimeout(function(){
        popupC.style.opacity = "0";
        popupC.style.visibility = "hidden";
    },900)
    nombrePac.value="";
    apellidoPac.value="";
    cedulaP.value="";
    nombrePac.focus();
});

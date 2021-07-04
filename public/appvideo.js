const ListaMedUL = document.getElementById('listavideo');
let cerrar = document.querySelector(".cerrar");
let abrirvideo = document.querySelector(".solicitar-videollamada");
let popup = document.querySelector(".popup");
let popupC = document.querySelector(".popup-contenedor");
let nombrePac = document.getElementById("nombrePac");
let apellidoPac = document.getElementById("apellidoP");
let cedulaPac = document.getElementById("documentoP");
let motivoC = document.getElementById("motivoC");
let telefono = document.getElementById("telefono");
const textopopup = document.getElementById("texto");



abrirvideo.addEventListener("click",function(e){
    e.preventDefault();
    const id = new Date().getTime().toString();
    const nombreP = nombrePac.value;
    const apellidoP = apellidoPac.value;
    const cedulaP = cedulaPac.value;
    const motivo = motivoC.value;
    const telP = telefono.value;
    const consultas = [];

    //Si hay datos en todas las cajas de texto, guardo todos los datos en un Objeto
    if (nombreP && apellidoP && cedulaP && motivo && telefono) {
        const objetoConsulta = {
            id,
            nombreP,
            apellidoP,
            cedulaP,
            motivo,
            telP,
        }
        //Guardo las solicitudes de consulta en un array
        consultas.push(objetoConsulta);
        
        //Mando al Server el array con las solicitudes de consulta a ingresar
        fetch('http://localhost:3000/video/videoconsulta', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //Con el metodo post, le paso el objeto de la consulta
                body: JSON.stringify({ videoconsultas: consultas })
                }).then (function(resultado){
                    console.log(resultado)
                });
                popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "El paciente" + "&nbsp" + nombrePac.value +  "&nbsp" + apellidoPac.value + "," + "&nbsp" + "con Documento:" + "&nbsp" + cedulaPac.value + "," + "&nbsp" + "motivo de consulta:" + "&nbsp" + motivoC.value + "," + "&nbsp" + "se encuentra en la primer posición para hacer atendido por el Médico disponible. Disculpe la molestia.";
        
    }
    else {
        alert ("Faltan Datos");
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
    cedulaPac.value="";
    motivoC.value="";
    telefono.value="";
    nombrePac.focus();
});

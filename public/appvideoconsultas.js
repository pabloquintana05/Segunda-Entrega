const ListaMedUL = document.getElementById('listavideo');
let cerrar = document.querySelector(".cerrar");
let popup = document.querySelector(".popup");
let popupC = document.querySelector(".popup-contenedor");
const textopopup = document.getElementById("texto");
let botonEnviar = document.querySelector(".Enviar");



botonEnviar.addEventListener('click',function(e) {
    e.preventDefault();
    const consultastoDelete = [];
    //creo una variable que traigo todos los checked box 
    
    const cajitas = document.querySelectorAll('input[type=checkbox]');
        
        //recorro todos los checkbox 
      for (i=0; i < cajitas.length; i++){
           
            //pregunto si esta clickeado el checkbox
           if (cajitas[i].checked) {
                //si es true, cargo en un array el id a eliminar
              consultastoDelete.push(cajitas[i].id);
              
            }

            
        }
        //Si el array esta vacio, es porque o no hay consulta seleccionada o no hay consultas
        if (consultastoDelete.length == 0){
            //Muestro el pop up
            popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "No hay Consultas seleccionadas.";
        }else {
            //Si hay consultas para eliminar, llamo a la ruta y le paso el array con los ids a eliminar
            fetch('http://localhost:3000/video/Deleteconsulta', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //Con el metodo post, le paso el arreglo de video Consultas seleccionadas
                body: JSON.stringify({ consultas: consultastoDelete })
                }).then (function(resultado){
                    console.log(resultado)
                });
                //Muestro pop up cuando se eliminen
                popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "Se eliminaron las VideoConsultas ya realizadas.";
        }
        
});


function crearNuevaTareaHTML(id, cedula, nombrePac, apellidoPac, telPaciente, motivoC) {
    // Crear un nuevo elemento li y guardarlo en una variable
    const nuevoelemento = document.createElement('li');
    const nuevacedula = document.createElement('span');
    const nuevoNombrePac = document.createElement('span');
    const nuevoApellidoPac = document.createElement('span');
    const nuevoTelP = document.createElement('span');
    const motivo = document.createElement('span');
    const chequeo = document.createElement('input');
   
    //colocar un id de cada solicitud de video consulta en el chequeo
    chequeo.setAttribute("type","checkbox");
    chequeo.setAttribute("id", id);
    // le agrego a los span los datos del paciente solicitante y el motivo de Consulta
    nuevoNombrePac.textContent =  "Nombre: " + nombrePac;
   
    nuevoApellidoPac.textContent =  "Apellido: " + apellidoPac;
    nuevacedula.textContent =  "Cédula: " + cedula;
    nuevoTelP.textContent =  "Telefono: " + telPaciente;
    motivo.textContent = "Motivo de Consulta:" + motivoC;
    // Cambiar el texto interno del li
    nuevoelemento.appendChild(nuevoNombrePac);
    nuevoelemento.appendChild(nuevoApellidoPac);
    nuevoelemento.appendChild(nuevacedula);
    nuevoelemento.appendChild(nuevoTelP);
    nuevoelemento.appendChild(motivo);
    nuevoelemento.appendChild(chequeo);
  
    
  
    // Agregar el li a la lista de solicitudes de Video Consultas
    ListaMedUL.appendChild(nuevoelemento);
}
  



function cargarConsultas() {
    // Utilizar fetch para acceder a las solicitudes de Video Consultas 
    fetch("http://localhost:3000/video/ConsultasPen", {
      method: "GET",
    }).then(function (respuesta) {
      return respuesta.json();
    }).then(function (respuestaJSON) {
        
        if (!respuestaJSON.error) {
            //sino da error, cargo el json que devuelve el get en un array
            const consultas = JSON.parse(respuestaJSON.datos);
            
            //cargo el largo del array en una variable
            const cantidadDeconsultas = consultas.length;
            //si el largo es 0, es porque no hay solicitudes pendientes y muestro popup
            if (cantidadDeconsultas == 0) {
                popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "No Hay VideoConsultas para mostrar";
            }else {
                //si hay datos, recorro el array y voy llamando a una funcion para armar el html a mostrar
                for(i = 0; i < cantidadDeconsultas; i++) {
                    
                    crearNuevaTareaHTML(consultas[i].id, consultas[i].cedulaP, consultas[i].nombreP, consultas[i].apellidoP, consultas[i].telP, consultas[i].motivo)
                }
            }
            
        }else {
            alert("Algo Fallo")
        }
      
    })
}
cerrar.addEventListener("click",function(){
    popup.classList.toggle("popup-cerrar");
   
    setTimeout(function(){
        popupC.style.opacity = "0";
        popupC.style.visibility = "hidden";
    },900)
    window.location.href = "http://localhost:3000/"  
});
cargarConsultas();
const ListaMedUL = document.getElementById('listamed');
let cerrar = document.querySelector(".cerrar");
let popup = document.querySelector(".popup");
let popupC = document.querySelector(".popup-contenedor");
const textopopup = document.getElementById("texto");
let botonEnviar = document.querySelector(".Enviar");



botonEnviar.addEventListener('click',function(e) {
    e.preventDefault();
    const repitestoDelete = [];
    //creo una variable que traigo todos los checked box 
    
    const cajitas = document.querySelectorAll('input[type=checkbox]');
        //console.log(repites)
        //recorro todos los checkbox 
      for (i=0; i < cajitas.length; i++){
           
            //pregunto si esta clickeado el checkbox
           if (cajitas[i].checked) {
                //si es true, cargo en un array el id a eliminar
              repitestoDelete.push(cajitas[i].id);
              
            }

            
        }
        if (repitestoDelete.length == 0){
            popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "No hay Repites seleccionados.";
        }else {
            //Si hay repites seleccionados, mando al server el array de Ids de repites a eliminar
            fetch('http://localhost:3000/Rep/DeleteRepite', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                //Con el metodo post, le paso el arreglo de Repites
                body: JSON.stringify({ repites: repitestoDelete })
                }).then (function(resultado){
                    console.log(resultado)
                });
                popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "Se avisará a los Pacientes de los Repites seleccionados realizados.";
        }
        
    
      
});


function crearNuevaTareaHTML(id, cedula, nombrePac, apellidoPac, medicacion, cant) {
    // Crear un nuevo elemento li y guardarlo en una variable
    const nuevoelemento = document.createElement('li');
    const nuevacedula = document.createElement('span');
    const nuevoNombrePac = document.createElement('span');
    const nuevoApellidoPac = document.createElement('span');
    const nuevaMedicacion = document.createElement('span');
    const Cantidad = document.createElement('span');
    const chequeo = document.createElement('input');
   
    //colocar un id de cada repite en el chequeo
    chequeo.setAttribute("type","checkbox");
    chequeo.setAttribute("id", id);
    // le agrego al span el texto y la cantidad
    nuevoNombrePac.textContent =  "Nombre: " + nombrePac;
   
    nuevoApellidoPac.textContent =  "Apellido: " + apellidoPac;
    nuevacedula.textContent =  "Cédula: " + cedula;
    nuevaMedicacion.textContent =  "Medicación: " + medicacion;
    Cantidad.textContent = "Cantidad que toma por día:" + cant;
    // Cambiar el texto interno del li
    nuevoelemento.appendChild(nuevoNombrePac);
    nuevoelemento.appendChild(nuevoApellidoPac);
    nuevoelemento.appendChild(nuevacedula);
    nuevoelemento.appendChild(nuevaMedicacion);
    nuevoelemento.appendChild(Cantidad);
    nuevoelemento.appendChild(chequeo);
  
    
  
    // Agregar el li a la lista de Repites
    ListaMedUL.appendChild(nuevoelemento);
}
  



function cargarRepites() {
    /* Utilizar fetch para acceder a los repites */
    fetch("http://localhost:3000/Rep/RepitesPen", {
      method: "GET",
    }).then(function (respuesta) {
      return respuesta.json();
    }).then(function (respuestaJSON) {
        
        if (!respuestaJSON.error) {
            //sino da error, cargo el json que devuelve el get en un array
            const repites = respuestaJSON.datos;
            //cargo el largo del array en una variable
            const cantidadDerepites = repites.length;
            //si el largo es 0, es porque no hay repites pendientes y muestro popup
            if (cantidadDerepites == 0) {
                popupC.style.opacity = "1";
                popupC.style.visibility = "visible";
                popup.classList.toggle("popup-cerrar");
                textopopup.innerHTML = "No Hay REPITES Pendientes para mostrar";
            }else {
                //si hay datos, recorro el array y voy llamando a una funcion para armar el html a mostrar
                for(i = 0; i < cantidadDerepites; i++) {
                    
                    crearNuevaTareaHTML(repites[i].idRep, repites[i].cedulaPac, repites[i].nombrePac, repites[i].apellidoPac, repites[i].Medicacion, repites[i].cantidad)
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

cargarRepites();
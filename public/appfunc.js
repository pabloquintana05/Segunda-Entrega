let usuario = document.getElementById("UsuarioF");
let pass = document.getElementById("passwordF");
let botoningreso = document.querySelector(".login");
let cerrar = document.querySelector(".cerrar");
let popup = document.querySelector(".popup");
let popupC = document.querySelector(".popup-contenedor");
const textopopup = document.getElementById("texto");



botoningreso.addEventListener("click",function(e){
    e.preventDefault();
    const user = usuario.value;
    const password = pass.value;
    //pregunto si usuario y pass tienen datos
    if (user && password){
        //si tienen, creo un objeto usuario con esos datos
        const objusuario = {
            user,
            password,
        };
        
        //llamo a la ruta login para ver si existe el usuario en el Backend 
        //con el metodo POST
        fetch('http://localhost:3000/auth/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //mando un JSON
            body: JSON.stringify(objusuario)
        })
        .then(function(response) {
            return response.json();

        })
        .then(function(response){
            //si la promesa no devuelve un error 
            if (!response.error){
                //Guardo el Token
                localStorage.setItem('token', response.token);
                //si el usuario es emergencia, redirecciono a el Html de solicitud de video consulta
                if (user == 'Emergencia'){
                    window.location.href = "http://localhost:3000/medicosEmer.html";
                } else {
                    if (user == 'Policlinica'){
                    //sino redirecciono para ver los repites pendientes
                    window.location.href = "http://localhost:3000/medicosPoli.html";
                    } else {
                        //si el usuario de Atencion al Usuario, redirecciono al chat y le paso como parametro el nombre
                        window.location.href = "http://localhost:3000/chat.html?nombrePac=AtencionalUsuario";
                    }
                    
                } 
            }else {
                alert ("Logueo Fallido");
                usuario.value = "";
                pass.value = "";
                usuario.focus();
            }
        })
    }else{
        alert("Faltan completar Datos");
    }
});


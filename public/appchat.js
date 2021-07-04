const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const salir = document.getElementById('boton-salir');
const params = window.location.search;
const socket = io();
//Traigo el parametro que viene en la URL
const urlParams = new URLSearchParams(params);
//Lo asigno a la variable
const nombre = urlParams.get('nombrePac');

//Escucho Mensaje desde el Server
socket.on('message', mensaje => {
    //Mando mensaje al DOM
    outputMessage(mensaje);

    //Para desplazarse hacia abajo cuando se envia un Mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


//Envio de Mensaje al Servidor
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Traer el msj de texto
    const msg = e.target.elements.msg.value;

    //Emito un mensaje al Server y le paso a demas el Nombre que envia el Mensaje
    socket.emit('chatMessage', msg, nombre);

    //Limpiar la caja de mensaje
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();

});

salir.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "http://localhost:3000/" ;

    
});


//Mensaje al DOM
function outputMessage(message){
    //Creo los elementos para mostrar los mensajes de chat
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
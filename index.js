const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
//Llamo al js messages para darle formato al chat
const formatMessage = require('./middlewares/messages');


const app = express();
const port = 3000;
//Creo el servidor http
const server = http.createServer(app);

const io = socketio(server);

const repRouter = require('./routes/Rep');
const authRouter = require('./routes/auth');
const videoRouter = require('./routes/video');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

//uso la ruta de repites

app.use('/Rep', repRouter);

//uso la ruta de autorizacion para logueo

app.use('/auth', authRouter);

//uso la ruta para las solicitudes de video Consultas

app.use('/video', videoRouter);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'public/index.html'));
});

// le digo a express que todos los archivos estan en public
app.use(express.static(path.join(__dirname,'public')));

const botName = 'Hospital de Colonia  ';

//corre cuando un cliente se conecta
io.on('connection', socket => {
    //Todos los mensajes que se emitan desde el Server mismo, saldran con el botName
    console.log('Conexion WS nueva');

    //Mensaje de bienvenida al chat cuando se conectan
    socket.emit('message', formatMessage(botName, 'Bienvenido al Chat'));

    //Mensaje cuando alguien se conecta
    socket.broadcast.emit('message', formatMessage(botName, 'Un usuario se ha unido'));


    //Mensaje Cuando un cliente se desconecta
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'El Usuario se ha ido'));
    });

    //Escuchar el chatMessage
    socket.on('chatMessage', (msg, userid) => {
        //lo envio al cliente
        io.emit('message', formatMessage(userid, msg));
    });
});

server.listen(port, function(){
    console.log(`Servidor esta escuchando en el puerto:${port}`)
});
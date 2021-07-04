const express = require('express');
const fs = require('fs');

const router = express.Router();

//Ruta para guardar los solicitudes de Video Consulta
router.post('/videoconsulta', function (req, res){
    //leo el archivo repites.json
    let datos = fs.readFileSync('Videollamada.json');
    //Si el archivo no tiene Datos, ingreso los datos al Archivo Videollamada.json
    if (datos.length == 0){
        //Traigo las solicitudes de Video Consulta ingresadas
        let resultado = JSON.stringify(req.body.videoconsultas);
        
        //Los ingreso en el archivo JSON
        fs.writeFileSync('Videollamada.json', resultado, { encoding: 'utf-8' } );
        res.send("Actualizado");
    } else {
        
        //Si el archivo Videollamada.json tiene datos, traigo los datos anteriores a un array
        let Objetos = JSON.parse(datos);
        
        //paso el arreglo con las nuevas solicitudes a una variable para ingresar los datos en un archivo json
        let resultado = req.body.videoconsultas;
    
        
        //se agregan los datos nuevos al array
        //... como si se hiciera un for

        Objetos.push(...resultado);
        
        let nuevaConsulta = JSON.stringify(Objetos);
        
        //escribo el archivo json con las nuevas solicitudes de Video Consulta
        fs.writeFileSync('Videollamada.json', nuevaConsulta, { encoding: 'utf-8' } );
        
        res.send("Actualizado");
    }
});

//Ruta para eliminar las solicitudes de Video Consultas que ya realizaron los Medicos
router.post('/DeleteConsulta', function (req, res){
    //Leo el archivo JSON de videollamadas
    let datos = fs.readFileSync('Videollamada.json');

    let datosconsultas = JSON.parse(datos);
    //Guardo el Array que trae los id de las video consultas a eliminar
    let idconsulta = req.body.consultas;
    //recorro el array de los id de las video consultas a eliminar
    for (var i = 0; i < idconsulta.length; i++) {
        //recorro el array del archivo JSON guardado
        for (var x = 0; x < datosconsultas.length; x++) {
            //comparo si el id que viene del front es igual al id de los repites guardados
            if (idconsulta[i] == datosconsultas[x].id) {
                //si es igual, elimino del array del JSON el video consulta entera
                datosconsultas.splice(x, 1);
            }
        }
    }
    //Actualizo el archivo JSON
    fs.writeFileSync('Videollamada.json', JSON.stringify(datosconsultas), { enconding: 'utf-8'} );
    res.send("Actualizado");

});

router.get('/', (req, res) => {
    res.json({ success: true });
});

//Ruta para enviar las solicitudes de Video Consultas pendientes
router.get('/ConsultasPen', (req, res) => {
    //Guardo en la variable datos, todo lo que contiene el JSON
    const datos = fs.readFileSync('Videollamada.json', { encoding: 'utf-8' } );
    if (datos.length == 0){
        res.json({error: 404});
    }
    else {
        
    //Mando el archivo JSON ya convertido (JSON.parse) para que pueda ser leido en el Frontend
       res.json({ error: null, datos: datos });
    }
    
}); 
  
module.exports = router;




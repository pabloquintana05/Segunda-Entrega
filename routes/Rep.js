const express = require('express');
const fs = require('fs');

const router = express.Router();

//Ruta para guardar las solicitudes de Repites de Medicacion
router.post('/repites', function (req, res){
    //leo el archivo repites.json
    let datos = fs.readFileSync('Repites.json');
    //Si el archivo no tiene Datos, ingreso los datos al Archivo Repites.json
    if (datos.length == 0){
        //Traigo los repites ingresados en el Frontend
        let resultado = JSON.stringify(req.body.repites);
        //Los ingreso en el archivo JSON
        fs.writeFileSync('Repites.json', resultado, { encoding: 'utf-8' } );
        res.send("Actualizado");
    } else {
        //Si el archivo repites.json tiene datos, traigo los datos guardados a un array
        let Objetos = JSON.parse(datos);
        
        //paso el arreglo con los nuevos repites a una variable para ingresar los datos a Repites.json
        let resultado = req.body.repites;
    
        
        //se agregan los datos nuevos al array
        //... como si se hiciera un for
        Objetos.push(...resultado);
    
        let nuevosRepites = JSON.stringify(Objetos);
        //escribo el archivo json con los nuevos repites
        fs.writeFileSync('Repites.json', nuevosRepites, { encoding: 'utf-8' } );
        
        res.send("Actualizado");
    }
   
    
    
   
});

//Ruta para eliminar las solicitudes de Repites cuando el medico hizo la receta
router.post('/DeleteRepite', function (req, res){
    //Leo el archivo JSON de repites
    let datos = fs.readFileSync('Repites.json');
    let datosrepites = JSON.parse(datos);
    //Guardo el Array que trae los id de los repites a eliminar
    let idrepites = req.body.repites;
    //recorro el array de los id de Repites a eliminar
    for (var i = 0; i < idrepites.length; i++) {
        //recorro el array del archivo JSON guardado
        for (var x = 0; x < datosrepites.length; x++) {
            //comparo si el id que viene del front es igual al id de los repites guardados
            if (idrepites[i] == datosrepites[x].idRep) {
                //si es igual, elimino del array del JSON el repite entero
                datosrepites.splice(x, 1);
            }
        }
    }
    //Actualizo el archivo Repites.json
    fs.writeFileSync('Repites.json', JSON.stringify(datosrepites), { enconding: 'utf-8'} );
    res.send("Actualizado");

});

router.get('/', (req, res) => {
    res.json({ success: true });
  });


//Ruta para enviar las solicitudes de Repite de medicacion pendientes
router.get('/RepitesPen', (req, res) => {
    //Guardo en la variable datos, todo lo que contiene el JSON
    const datos = fs.readFileSync('Repites.json', { encoding: 'utf-8' } );
    
    //Mando el archivo JSON ya convertido (JSON.parse) para que pueda ser leido en el Frontend
    res.json({ error: null, datos: JSON.parse(datos) });
}); 
  
module.exports = router;
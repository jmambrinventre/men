var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res){
    Bicicleta.allBicis()
    .then(function(bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    })
    .catch(function(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.bicicleta_create = async function(req, res){
    try {
        const bicicleta = await Bicicleta.create({
            id: req.body.id, 
            color: req.body.color, 
            modelo: req.body.modelo,
            ubicacion: [req.body.lat, req.body.lng]
        });
        res.status(200).json({
            bicicleta: bicicleta
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.bicicleta_delete = async function(req, res){
    try {
        await Bicicleta.findByIdAndRemove(req.body._id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.bicicleta_update_post = async function(req, res){
    try {
        const bicicleta = await Bicicleta.findByIdAndUpdate(req.body._id, 
            {
                color: req.body.color,
                modelo: req.body.modelo,
                ubicacion: [req.body.lat, req.body.lng]
            }, {new: true}
            );
        res.status(200).json({
            bicicleta: bicicleta
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// var Bicicleta = require('../../models/bicicleta');

// exports.bicicleta_list = function(req, res){
//     res.status(200).json({
//         bicicletas: Bicicleta.allBicis
//     })
// }

// exports.bicicleta_create = function(req, res){
//     var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
//     bici.ubicacion = [req.body.lat, req.body.lng];

//     Bicicleta.add(bici);

//     res.status(200).json({
//         bicicleta: bici
//     })
// }

// exports.bicicleta_delete = function(req, res){
//     Bicicleta.removeById(req.body.id);
//     res.status(204).send();
// }

// exports.bicicleta_update_post = function(req, res){
//     var bici = Bicicleta.findbyId(req.body.id);
//     bici.id = req.body.id;
//     bici.color = req.body.color;
//     bici.modelo = req.body.modelo;
//     bici.ubicacion = [req.body.lat, req.body.lng];

//     res.status(200).json({
//         bicicleta: bici
//     })
// }

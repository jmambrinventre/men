var Reserva = require('../../models/reserva');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var moment = require('moment');

exports.reserva_list = async function(req, res) {
    try {
        const reservas = await Reserva.find({});
        res.status(200).json({reservas: reservas});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.reserva_create = async function(req, res) {
    const bici = new Bicicleta({
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    });

    try {
        const nuevaBici = await Bicicleta.add(bici);
        const reserva = new Reserva({
            desde: moment(req.body.desde, "DD/MM/YYYY"),
            hasta: moment(req.body.hasta, "DD/MM/YYYY"),
            bicicleta: nuevaBici._id,
            usuario: req.user._id
        });

        const nuevaReserva = await reserva.save();
        res.status(200).json({reserva: nuevaReserva});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.reserva_delete = async function(req, res) {
    try {
        await Reserva.findByIdAndDelete(req.body.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.reserva_update_post = async function(req, res) {
    try {
        const reserva = await Reserva.findById(req.body.id);
        reserva.bicicletas = req.body.bicicletas;
        reserva.desde = req.body.desde;
        reserva.hasta = req.body.hasta;

        const reservaActualizada = await reserva.save();
        res.status(200).json({reserva: reservaActualizada});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// var Reserva = require('../../models/reserva');
// var Bicicleta = require('../../models/bicicleta');
// var Usuario = require('../../models/usuario');
// var moment = require('moment');

// exports.reserva_list = function(req, res){
//     res.status(200).json({
//         reservas: Reserva.allBicis
//     })
// }

// exports.reserva_create = function(req, res){
//     var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
//     bici.ubicacion = [req.body.lat, req.body.lng];

//     Bicicleta.add(bici);

//     res.status(200).json({
//         bicicleta: bici
//     })

//     Bicicleta.findById(req.body.biciId, function(err, bici){
//         if(err) next(err);

//         var reserva = new Reserva({
//             desde: moment(req.body.desde, "DD/MM/YYYY"),
//             hasta: moment(req.body.hasta, "DD/MM/YYYY"),
//             bicicleta: bici._id,
//             usuario: req.user._id
//         });

//         reserva.save(function(err){
//             if(err) next(err);
//             res.status(200).json(reserva);
//         });
//     });
// }

// exports.reserva_delete = function(req, res){
//     Reserva.findByIdAndDelete(req.body.id, function(err){
//         if(err) next(err);
//         res.status(204).send();
//     });
// }

// exports.reserva_update_post = function(req, res){
//     Reserva.findById(req.body.id, function(err, reserva){
//         reserva.bicicletas = req.body.bicicletas;
//         reserva.desde = req.body.desde;
//         reserva.hasta = req.body.hasta;

//         reserva.save(function(err){
//             if(err) return res.status(500).json({error: err.message});
//             res.status(200).json({reserva: reserva});
//         });
//     });
// }
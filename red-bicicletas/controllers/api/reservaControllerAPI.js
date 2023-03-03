var Reserva = require('../../models/reserva');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var moment = require('moment');

exports.reserva_list = function(req, res){
    Reserva.find({}, function(err, reservas){
        if(err) next(err);
        res.status(200).json({
            reservas: reservas
        });
    });
}

exports.reserva_create = function(req, res){
    Bicicleta.findById(req.body.biciId, function(err, bici){
        if(err) next(err);

        var reserva = new Reserva({
            desde: moment(req.body.desde, "DD/MM/YYYY"),
            hasta: moment(req.body.hasta, "DD/MM/YYYY"),
            bicicleta: bici._id,
            usuario: req.user._id
        });

        reserva.save(function(err){
            if(err) next(err);
            res.status(200).json(reserva);
        });
    });
}

exports.reserva_delete = function(req, res){
    Reserva.findByIdAndDelete(req.body.id, function(err){
        if(err) next(err);
        res.status(204).send();
    });
}

exports.reserva_update_post = function(req, res){
    Reserva.findById(req.body.id, function(err, reserva){
        reserva.bicicletas = req.body.bicicletas;
        reserva.desde = req.body.desde;
        reserva.hasta = req.body.hasta;

        reserva.save(function(err){
            if(err) return res.status(500).json({error: err.message});
            res.status(200).json({reserva: reserva});
        });
    });
}
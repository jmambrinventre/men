const Usuario = require('../../models/usuario');

exports.usuario_list = async function(req, res){
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            usuarios: usuarios
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.usuario_create = async function(req, res){
    try {
        const usuario = await Usuario.create({id: req.body.id, nombre: req.body.nombre});
        res.status(200).json({
            usuario: usuario
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.usuario_delete = async function(req, res){
    try {
        await Usuario.findByIdAndRemove(req.body._id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.usuario_update_post = async function(req, res){
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.body._id, {nombre: req.body.nombre}, {new: true});
        res.status(200).json({
            usuario: usuario
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// var Usuario = require('../../models/usuario');

// exports.usuario_list = function(req, res){
//     Usuario.allUsuarios(function(usuarios){
//         res.status(200).json({
//             usuarios: usuarios
//         });
//     });
// };

// exports.usuario_create = function(req, res){
//     var usuario = new Usuario({nombre: req.body.nombre});

//     Usuario.add(usuario, function(usuario){
//         res.status(200).json({
//             usuario: usuario
//         });
//     });
// };

// exports.usuario_delete = function(req, res){
//     Usuario.removeById(req.body.id, function(){
//         res.status(204).send();
//     });
// };

// exports.usuario_update_post = function(req, res){
//     Usuario.findById(req.body.id, function(usuario){
//         usuario.nombre = req.body.nombre;

//         Usuario.update(usuario, function(usuario){
//             res.status(200).json({
//                 usuario: usuario
//             });
//         });
//     });
// };

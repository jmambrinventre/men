const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.delete('/delete', usuarioController.usuario_delete);
router.put('/update', usuarioController.usuario_update_post);

module.exports = router;

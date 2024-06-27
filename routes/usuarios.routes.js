const {Router} = require('express')
const { registrarUsuario, obtenerTodosLosUsuarios, obtenerUnUsuario, bajaFisicaUsuario, bajaLogicaUsuario } = require('../controllers/usuarios.controllers')
const router = Router()

// GET
router.get('/', obtenerTodosLosUsuarios)
router.get('/:idUsuario', obtenerUnUsuario)

// POST
router.post('/', registrarUsuario)

// PUT
router.put('/:idUsuario', bajaLogicaUsuario)

// DELETE
router.delete('/:idUsuario', bajaFisicaUsuario)

module.exports = router
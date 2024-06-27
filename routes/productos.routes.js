const express = require('express');
const { obtenerUnProductoOTodosPorId, crearProducto, editarProductoPorId, eliminarProductoPorId } = require('../controllers/productos.controllers');
const router = express.Router()

// GET
router.get('/', obtenerUnProductoOTodosPorId)

// POST
router.post("/", crearProducto)

// PUT
router.put("/:idProducto", editarProductoPorId);

// DELETE
router.delete("/:idProducto", eliminarProductoPorId) 

module.exports = router
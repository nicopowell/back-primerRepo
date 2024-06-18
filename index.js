const express = require('express')
const app = express()
const path = require('path')

const PORT = 3001

// MIDDLEWARES
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

let productos = [
    {
        id: 1,
        nombre: 'Celular',
        precio: 100000
    },
    {
        id: 2,
        nombre: 'Tablet',
        precio: 120000
    }
]

// GET
app.get('/api/productos', (req, res) => {
    // Request - Es la peticion que el front nos envia al back
    // Response - Es la respuesta del back al front
    // response - status - formato
    try{
        let id = Number(req.query.id)

        if (id){
            const producto = productos.find((prod) => prod.id === id)
            res.status(200).json(producto)
        } else {
            res.status(200).json(productos)
        }
    
        res.status(200).json(productos)
    } catch (error){
        res.status(500).json(error)
    }
})

/*
app.get('/api/productos/:idProducto', (req, res) => {
    // req - body - params - query
    // params - parametro 
    // /api/producto/:parametro

    // query - dato
    // req.query.id

    const id = Number(req.params.idProducto)
    const producto = productos.find((prod) => prod.id === id)
    
})
*/

// POST
app.post('/api/productos', (req, res) => {
    try{
        // const dataProducto = req.body
        // const {nombre, precio} = req.body

        // spread operator ...
        const nuevoProducto = {
            id: productos[productos.length-1].id + 1,
            ...req.body
        }

        productos.push(nuevoProducto)

        res.status(201).json(nuevoProducto)
    } catch (error){
        res.status(500).json(error)
    }
})

// PUT
app.put('/api/productos/:idProducto', (req, res) => {
    try{
        const id = Number(req.params.idProducto)
        const posicionProductoEnElArray = productos.findIndex((producto) => producto.id === id)

        const productoEditado = {
            id,
            ...req.body            
        }
        
        productos[posicionProductoEnElArray] = productoEditado

        res.status(200).json(productos[posicionProductoEnElArray])
    } catch (error){
        res.status(500).json(error)
    }
})

// DELETE
app.delete('/api/productos/:idProducto', (req, res) => {
    try{
        const id = Number(req.params.idProducto)
        const productosNoBorrados = productos.filter((producto) => producto.id !== id)

        productos = productosNoBorrados

        res.status(200).json(productos)
    } catch (error){
        res.status(500).json(error)
    }
})

app.listen(PORT, () => {
    console.log('server ok', PORT)
})
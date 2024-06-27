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

const obtenerUnProductoOTodosPorId =  (req, res) => {
    try {
        const id = Number(req.query.id);

        if (id) {
            const producto = productos.find((prod) => prod.id === id);
            res.status(200).json(producto);
        } else {
            res.status(200).json(productos);
        }
    } catch (error) {
        res.status(500).json(error);
    }
    /*
        router.get('/:idProducto', (req, res) => {
        req - body - params - query
        params - parametro 
        /api/producto/:parametro

        query - dato
        req.query.id

        const id = Number(req.params.idProducto)
        const producto = productos.find((prod) => prod.id === id)
        })
    */
}

const crearProducto = (req, res) => {
    try {
        // const dataProducto = req.body
        // const {nombre, precio} = req.body
    
        // spread operator ...
        const nuevoProducto = {
            id: productos[productos.length - 1].id + 1,
            ...req.body,
        };
    
        productos.push(nuevoProducto);
    
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json(error);
    }
}

const editarProductoPorId = (req, res) => {
    try {
        const id = Number(req.params.idProducto);
        const posicionProductoEnElArray = productos.findIndex(
            (producto) => producto.id === id
        );

        const productoEditado = {
            id,
            ...req.body,
        };

        productos[posicionProductoEnElArray] = productoEditado;

        res.status(200).json(productos[posicionProductoEnElArray]);
    } catch (error) {
        res.status(500).json(error);
    }
}

const eliminarProductoPorId = (req, res) => {
    try {
        const id = Number(req.params.idProducto);
        const productosNoBorrados = productos.filter((producto) => producto.id !== id);

        productos = productosNoBorrados;

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    obtenerUnProductoOTodosPorId,
    crearProducto,
    editarProductoPorId,
    eliminarProductoPorId
}
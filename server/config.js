const express = require("express");
const path = require("path")
const cors = require('cors')



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080

        this.middleware()
        this.routes()
    }

    middleware(){
        // MIDDLEWARES
        this.app.use(express.json())
        // ARCHIVOS ESTATICOS
        this.app.use(express.static(path.join(__dirname, 'public')))
        // CORS
        this.app.use(cors())
    }

    routes() {
        this.app.use('/api/productos', require('../routes/productos.routes'))
        this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("server ok", this.port);
        });
    }
}

module.exports = Server

const usuarios = [
    {
        id: 1,
        nombreDelUsuario: 'nicopowell',
        emailDelUsuario: 'nicopowell30@gmail.com',
        baja: false,
        contrasenia: '123456'
    }
]

const registrarUsuario = (req, res) => {
    try{
        const body = req.body
        const emailExiste = usuarios.find((usuario) => usuario.emailDelUsuario === body.emailDelUsuario)
        const nombreExiste = usuarios.find((usuario) => usuario.nombreDelUsuario === body.nombreDelUsuario)

        if(emailExiste) {
            return res.status(400).json({msg: "Email no disponible"})
        } else if(nombreExiste) {
                return res.status(400).json({msg: "Nombre no disponible"})
        }

        const id = crypto.randomUUID()
        
        usuarios.push({id, baja:false, ...body})

        res.status(200).json({msg:"Usuario registrado con exito"})
    }catch(error){
        console.log(error)
    }
}

const obtenerTodosLosUsuarios = (req, res) => {
    try {
        res.status(200).json(usuarios)
    } catch (error) {
        console.log(error)
    }
}

const obtenerUnUsuario = (req, res) => {
    try {
        const id = Number(req.params.idUsuario)
        const usuario = usuarios.find((usuario) => usuario.id === id)

        if(!usuario) return res.status(400).json({msg:'usuario no encontrado'})

        res.status(200).json(usuario)
    } catch (error) {
        console.log(error)
    }
}

const bajaFisicaUsuario = (req, res) => {
    try {
        const id = req.params.idUsuario
        const posicionDelUsuario = usuarios.findIndex((usuario) => usuario.id === id)
        usuarios.splice(posicionDelUsuario, 1)

        res.status(200).json(usuarios)
    } catch (error) {
        console.log(error)
    }
}

const bajaLogicaUsuario = (req, res) => {
    try {
        const id = req.params.idUsuario
        const posicionDelUsuario = usuarios.findIndex((usuario) => usuario.id === id)

        usuarios[posicionDelUsuario].baja = !usuarios[posicionDelUsuario].baja

        const mensaje = !usuarios[posicionDelUsuario].baja ? "Usuario dado de alta" : "Usuario dado de baja" 

        res.status(200).json({msg: mensaje})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registrarUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    bajaFisicaUsuario,
    bajaLogicaUsuario
}
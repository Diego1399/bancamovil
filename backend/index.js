const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express();
const db = require('./database/connection');
const connection = require('./database/connection');

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    // Porbar conexion a la base de datos
    db.getConnection((err, connect) => {
        if(err) {
            console.error('ERROR al conectar a la base de datos');
            return;
        }
        console.log('Conexion a la base de datos exitosa');
        
        connect.release()
    })
});

app.post('/register', async (req, res) => {
    const {nombre, apellido, username, password, phone, email} = req.body

    try {
        const password_hash = await bcryptjs.hash(password, 10); // encriptar contrasena

        // Validar si el username ya se encuentra registrado
        const [user] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [username])
        if(user.length>0) return res.status(400).json({message: 'Usuario ya existe'})

        db.query('INSERT INTO usuarios (nombre, apellido, username, password, phone, email) values (?,?,?,?,?,?)',
            [nombre, apellido, username, password_hash, phone, email], 
            (err, result) => {
                if (err) {
                    console.log(err.message)
                    return res.status(400).json({message: 'Error al crear usuario'})
                }
                return res.status(200).json({message: "Usuario creado", user: {id: result.insertId, username}})
            }
        )

        res.status(200).json({message: 'Usuario registrado'})

    } catch (error) {
        console.error('ERROR al registrar usuario')
        res.status(500).json({message: 'Error al registrar usuario'})
    }
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {

        const [user] = await db.promise().query('SELECT * FROM usuarios WHERE username = ?', [username]);
        const usuario = user[0];

        if(!usuario) return res.status(400).json({message: 'Usuario no existe'})

        const password_valido = await bcryptjs.compare(password, usuario.password);

        if(!password_valido) return res.status(400).json({message: 'Credenciales invalidas'});

        const token = jwt.sign(
            {id: usuario.id, username: usuario.username, nombre: usuario.nombre, apellido: usuario.apellido},
            'private_key', { expiresIn: '1h' }
        );

        return res.status(200).json({message: "Inicio de sesion exitosa", user: usuario, token: token})
        
    } catch (error) {
        console.error('Error en el login ', error.message);
        res.status(500).json({message: 'Error en el login'})
    }
})

app.get('/cuenta', async (req, res) => {
    const {userid} = req.body;
    
    try {
        const [cuentas] = await db.promise().query('SELECT * FROM cuenta WHERE usuario_id = ?', [userid]);

        return res.status(200).json({cuentas: cuentas})

    } catch(error) {
        console.error('Error al obtener cuentas ', error.message);
        res.status(500).json({message: 'Error al obtener cuentas'})
    }
})

app.post('/new_cuenta', async (req, res) => {
    const {usuario, numero, saldo, tipo} = req.body
    try {
        const [user] = await db.promise().query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuario])
        if(!user[0]) return res.status(400).json({message: 'Usuario no existe'})
        db.query('INSERT INTO cuenta (usuario, numero, saldo, tipo) values (?,?,?,?)',
            [usuario, numero, saldo, tipo], 
            (err, result) => {
                if (err) {
                    console.log(err.message)
                    return res.status(400).json({message: 'Error al crear una cuenta'})
                }
                return res.status(200).json({message: "Cuenta creada", cuenta: result.insertId})
            }
        )
    } catch (error) {
        console.error('ERROR al crear cuenta')
        return res.status(500).json({message: 'Error al crear cuenta'})
    }
})

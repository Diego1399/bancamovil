const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./database/connection');
const connection = require('./database/connection');

const PORT = process.env.PORT || 3000;

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


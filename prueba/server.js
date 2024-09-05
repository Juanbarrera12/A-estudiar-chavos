const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Habilitar CORS para que tu frontend pueda hacer solicitudes al servidor
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint para obtener los partidos en vivo
app.get('/api/matches', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'b10386809ca145f388fb495cfaa6b2f1'  // Reemplaza con tu API Key de football-data.org
            }
        });

        // Agregando log para depuración
        console.log("Datos obtenidos de la API:", response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Error al obtener los datos de los partidos:", error);
        res.status(500).send('Error al obtener los datos de los partidos');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

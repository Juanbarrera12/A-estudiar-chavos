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

        console.log("Datos obtenidos de la API (matches):", response.data);

        res.json(response.data);
    } catch (error) {
        console.error("Error al obtener los datos de los partidos:", error);
        res.status(500).send('Error al obtener los datos de los partidos');
    }
});

// Endpoint para obtener las tablas de las ligas
app.get('/api/league-tables', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/competitions', {
            headers: {
                'X-Auth-Token': 'b10386809ca145f388fb495cfaa6b2f1'  // Reemplaza con tu API Key de football-data.org
            }
        });

        const importantLeagues = ['PL', 'PD', 'SA', 'BL1', 'FL1']; // Códigos de ligas importantes
        const filteredCompetitions = response.data.competitions.filter(competition => importantLeagues.includes(competition.code));

        const leagueTables = [];

        for (const league of filteredCompetitions) {
            const standingsResponse = await axios.get(`https://api.football-data.org/v4/competitions/${league.id}/standings`, {
                headers: {
                    'X-Auth-Token': 'b10386809ca145f388fb495cfaa6b2f1'
                }
            });

            console.log(`Tabla de ${league.name}:`, standingsResponse.data);

            leagueTables.push({
                name: league.name,
                standings: standingsResponse.data.standings
            });
        }

        res.json({ competitions: leagueTables });
    } catch (error) {
        console.error('Error al obtener las tablas de las ligas:', error);
        res.status(500).send('Error al obtener las tablas de las ligas');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


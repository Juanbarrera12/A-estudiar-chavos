const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Habilitar CORS para permitir solicitudes desde el frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Función para obtener las cuotas de apuestas de 1xbet
async function getOddsForMatch(matchId) {
    try {
        const response = await axios.get(`https://1xbet.api.url/match/${matchId}/odds?apiKey=7470d1bab7f343ff9301745422a220e10c0a25875aaa4a14a01bb13b3dcb0d0a`);

        const markets = response.data.markets;

        // Extraer las cuotas de victoria local, empate y victoria visitante
        const homeOdds = markets.win1 ? markets.win1.v : 'N/A';
        const drawOdds = markets.winX ? markets.winX.v : 'N/A';
        const awayOdds = markets.win2 ? markets.win2.v : 'N/A';

        return { home: homeOdds, draw: drawOdds, away: awayOdds };
    } catch (error) {
        console.error(`Error al obtener las cuotas para el partido ${matchId}:`, error);
        return { home: 'N/A', draw: 'N/A', away: 'N/A' };
    }
}

// Endpoint para obtener los partidos en vivo con las cuotas de apuestas
app.get('/api/matches', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/matches', {
            headers: {
                'X-Auth-Token': 'b10386809ca145f388fb495cfaa6b2f1'  // Reemplaza con tu API Key de football-data.org
            }
        });

        const matches = response.data.matches;
        const matchesWithOdds = [];

        for (const match of matches) {
            const odds = await getOddsForMatch(match.id);  // Obtiene las cuotas de apuestas para cada partido
            matchesWithOdds.push({
                ...match,
                odds: odds || { home: 'N/A', draw: 'N/A', away: 'N/A' }  // Agrega las cuotas al objeto del partido
            });
        }

        res.json({ matches: matchesWithOdds });
    } catch (error) {
        console.error("Error al obtener los datos de los partidos:", error);
        res.status(500).send('Error al obtener los datos de los partidos');
    }
});

// Endpoint para obtener las tablas de las ligas importantes
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

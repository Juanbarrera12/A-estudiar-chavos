async function fetchLeagueTables() {
    try {
        const response = await fetch('http://localhost:3000/api/league-tables');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Verifica la estructura de los datos

        const tablesContainer = document.getElementById('tables');
        tablesContainer.innerHTML = '';

        if (!data.competitions || data.competitions.length === 0) {
            tablesContainer.innerHTML = '<p>No se encontraron tablas de ligas.</p>';
            return;
        }

        data.competitions.forEach(competition => {
            const competitionElement = document.createElement('div');
            competitionElement.className = 'competition';

            const leagueName = competition.name;
            const standings = competition.standings[0].table;

            competitionElement.innerHTML = `<h2>${leagueName}</h2>`;

            const tableElement = document.createElement('table');
            tableElement.innerHTML = `
                <thead>
                    <tr>
                        <th class="datos">Posición</th>
                        <th>Equipo</th>
                        <th class="datos">Puntos</th>
                        <th class="datos">Partidos Jugados</th>
                        <th class="datos">Ganados</th>
                        <th class="datos">Empatados</th>
                        <th class="datos">Perdidos</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            standings.forEach(team => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="datos">${team.position}</td>
                    <td>${team.team.name}</td>
                    <td class="datos">${team.points}</td>
                    <td class="datos">${team.playedGames}</td>
                    <td class="datos">${team.won}</td>
                    <td class="datos">${team.draw}</td>
                    <td class="datos">${team.lost}</td>
                `;
                tableElement.querySelector('tbody').appendChild(row);
            });

            competitionElement.appendChild(tableElement);
            tablesContainer.appendChild(competitionElement);
        });
    } catch (error) {
        console.error('Error fetching league tables:', error);

        const tablesContainer = document.getElementById('tables');
        tablesContainer.innerHTML = '<p>Error al obtener las tablas de las ligas. Por favor, inténtelo más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLeagueTables(); // Llama la función al cargar la página
});

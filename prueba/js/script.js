async function fetchLiveScores() {
    try {
        const response = await fetch('http://localhost:3000/api/matches');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data); // Verifica la estructura de los datos

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        // Verifica si hay partidos
        if (data.matches.length === 0) {
            resultsContainer.innerHTML = '<p>No hay partidos programados para hoy.</p>';
            return;
        }

        data.matches.forEach(match => {
            console.log(match); // Inspecciona el objeto completo del partido

            const matchElement = document.createElement('div');
            matchElement.className = 'match';

            // Ajusta el acceso a las propiedades según la estructura real
            const homeTeamName = match.homeTeam.shortName || match.homeTeam.name;
            const awayTeamName = match.awayTeam.shortName || match.awayTeam.name;

            const homeScore = match.score.fullTime.home ?? 'Pendiente';
            const awayScore = match.score.fullTime.away ?? 'Pendiente';

            console.log(`Equipo Local: ${homeTeamName}, Marcador: ${homeScore}`);
            console.log(`Equipo Visitante: ${awayTeamName}, Marcador: ${awayScore}`);

            matchElement.innerHTML = `
                <div class="team">${homeTeamName}</div>
                <div class="score">${homeScore} | ${awayScore}</div>
                <div class="team">${awayTeamName}</div>
            `;

            resultsContainer.appendChild(matchElement);
        });
    } catch (error) {
        console.error('Error fetching live scores:', error);

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '<p>Error al obtener los resultados. Por favor, inténtelo más tarde.</p>';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchLiveScores(); // Llama la función al cargar la página

    // Actualiza los resultados cada 60 segundos (60000 milisegundos)
    setInterval(fetchLiveScores, 60000);
});

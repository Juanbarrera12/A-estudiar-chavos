async function fetchLiveScores() {
    try {
        const response = await fetch('http://localhost:3000/api/matches');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Datos obtenidos de la API:', data); // Verifica si los datos están llegando

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        if (!data.matches || data.matches.length === 0) {
            resultsContainer.innerHTML = '<p>No hay partidos en vivo en este momento.</p>';
            return;
        }

        data.matches.forEach(match => {
            console.log(match); // Verifica la estructura de cada partido

            const matchElement = document.createElement('div');
            matchElement.className = 'match';

            const homeScore = match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : 0;
            const awayScore = match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : 0;

            matchElement.innerHTML = `
                <div class="team">${match.homeTeam.name}</div>
                <div class="score">${homeScore} - ${awayScore}</div>
                <div class="team">${match.awayTeam.name}</div>
            `;

            resultsContainer.appendChild(matchElement);
        });
    } catch (error) {
        console.error('Error fetching live scores:', error);

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '<p>Error al obtener los resultados. Por favor, inténtelo más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchLiveScores);

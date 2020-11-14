window.addEventListener('DOMContentLoaded', async () => {
	const data = await Api.getCompetitions();
	if (data) {
		renderStandings(data.standings);
	} else {
		renderError();
	}
});

function renderError() {
	const container = document.querySelector('#standing tbody');
	container.innerHTML = `<p>Cannot access when offline</p>`;
}

function renderStandings(standings) {
	const container = document.querySelector('#standing tbody');
	standings[0].table.map(team => {
		const item = `<tr>
                    <td>${team.position}</td>
                    <td>
                        <a href="team.html?id=${team.team
													.id}" style = "color :#3F1052; text-decoration: underline">${team
			.team.name}</a>
                    </td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
            </tr>`;

		container.innerHTML += item;
	});
}

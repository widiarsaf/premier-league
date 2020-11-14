window.addEventListener('DOMContentLoaded', async () => {
    const data = await Db.getAllTeam()
    if (!data) {
        renderEmptyData()

    } else {
        renderFavoriteTeams(data)
    }
})

function renderEmptyData() {
    const container = document.getElementById('favorite-teams')
    container.innerHTML += '<div class = "card"><p>There is no favorite team yet</p></div>'
}

function renderFavoriteTeams(teams) {
    const container = document.getElementById('favorite-teams')

    teams.map(team => {
        const item =
            `
            <a href = "team.html?id=${team.id }">
            <div class="card" style = "margin : 10px 20px; display : flex; padding: 10px 10px;">
                <img class="logo" src="${team.crestUrl}" style = "width : 100px ">
                <div style = "margin: 10px 20px;">
                    <h5 style="color: #3F1052;">${team.name}</h>
                    <p style = "color : black">${team.venue}</p>
                </div>
            </div>
            </a>`

        container.innerHTML += item
    })
}
window.onload = preload();

function preload() {
    const detail = document.getElementById('details')
    const preload = `
    <div class="card" style = "padding: 10px 10px;">
    <div style = "display: flex; justify-content:center; padding-top:160px; padding-bottom:160px;">
            <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
            </div>
            </div>`
    detail.innerHTML += preload
}


window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const teamId = urlParams.get("id")

    const data = await Api.getTeamDetails(teamId)
    renderTeamDetails(data)
})

function renderTeamDetails(data) {
    const container = document.getElementById('details')

    const element =
        `<div class="card" style = "padding: 10px 10px;">
            <div style = "display : flex; justify-content : center; flex-direction : column; text-align : center;">
                <img src = "${data.crestUrl}" style = "height :200px; border-radius : 10px; margin : 20px 0px;" >
                <h6 class = "truncate" style="color: #3F1052;"><b>${data.name}</b></h6>
            </div>
            <div style="margin : 2px 20px;">
                <h6 style="color: #3F1052;"><b>Area</b><h6>
                <p>${data.area.name}</p>
                <h6 style="color: #3F1052;"><b>Venue</b><h6>
                <p>${data.venue}</p>
                <h6 style="color: #3F1052;"><b>Address</b><h6>
                <p>${data.address}</p>
                <h6 style="color: #3F1052;"><b>Phone</b><h6>
                <p>${data.phone}</p>
                <h6 style="color: #3F1052;"><b>Website</b><h6>
                <p style="text-decoration : underline;">${data.website}</p>
                <h6 style="color: #3F1052;"><b>Squad</b><h6>
            </div>
            <div class="card" style="margin : 4px 20px;">
                <table>
                    <thead style="background: #3F1052;" class = "white-text" >
                    <tr>
                        <th style = "padding : 10px 30px;">Player</th>
                        <th style = "padding : 10px 30px;">Position</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${data.squad.map(player => (
                            `<tr>
                                <td style = "padding : 10px 30px;">${player.name}</td>
                                <td style = "padding : 10px 30px;">${player.position}</td>
                            </tr>`
                        )).join('')}
                    </tbody>
                </table>
            </div>
        </div>`

    container.innerHTML = element
    saveButton(data)
}

async function saveButton(team) {
    const button = document.getElementById('save')
    if (await Db.getTeam(team.id)) {
        button.innerHTML = 'delete'
    }

    button.addEventListener('click', async () => {
        let exist = await Db.getTeam(team.id)

        if (exist) {
            Db.deleteTeam(team.id)
            button.innerHTML = 'bookmark'
            console.log('Team berhasil dihapus!')
            showNotifikasiDelete()
        } else {
            Db.addTeam(team)
            button.innerHTML = 'delete'
            console.log('Team berhasil ditambahkan!')
            showNotifikasiAdd()
        }
    })
}

function showNotifikasiAdd() {
    M.toast({
        html: 'Team was added',
        displayLength: 2000,
        inDuration: 750,
        outDuration: 2000
    });
}

function showNotifikasiDelete() {
    M.toast({
        html: 'Team was deleted',
        displayLength: 2000,
        inDuration: 1000,
        outDuration: 1000


    });
}
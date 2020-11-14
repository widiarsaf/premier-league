const base_url = 'https://api.football-data.org/v2'
const option = {
    headers: {
        'X-Auth-Token': '996f91fefc864d51a391a1d2bfb4b43f'
    }
}

const Api = {
    getCompetitions() {
        if ('caches' in window) {
            return caches.match(`${base_url}/competitions/2021/standings`).then(response => {
                if (response) {
                    return response.json()
                } else {
                    return fetch(`${base_url}/competitions/2021/standings`, option)
                        .then(response => response.json())
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    },

    getTeamDetails(id) {
        if ('caches' in window) {
            return caches.match(`${base_url}/teams/${id}`).then(response => {
                if (response) {
                    return response.json()
                } else {
                    return fetch(`${base_url}/teams/${id}`, option)
                        .then(response => response.json())
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    }
}
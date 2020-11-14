const dbPromise = idb.open('premier-league', 1, upgradeDb => {
    const teamsStore = upgradeDb.createObjectStore('teams', {keyPath: 'id'})
    teamsStore.createIndex('name', 'name', {unique: true})
})

const Db = {
    addTeam(team) {
        return dbPromise.then(db => {
            const tx = db.transaction('teams', 'readwrite')
            tx.objectStore('teams').put(team)
            return tx.complete
        })
    },

    getTeam(id) {
        return dbPromise.then(db => {
            const tx = db.transaction('teams', 'readonly')
            return tx.objectStore('teams').get(id)
        })
    },

    getAllTeam() {
        return dbPromise.then(db => {
            const tx = db.transaction('teams', 'readonly')
            return tx.objectStore('teams').getAll()
        })
    },

    deleteTeam(id) {
        dbPromise.then(db => {
            const tx = db.transaction('teams', 'readwrite')
            return tx.objectStore('teams').delete(id)
        })
    }
}
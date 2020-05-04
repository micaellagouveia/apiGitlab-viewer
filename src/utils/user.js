module.exports = {
    getTribune: (groups) => {
        for (let i in groups) {
            if (groups[i].name.includes('PJE_TRIBUNAL_')) {
                return groups[i].name
            }
        }
        return false
    }
}
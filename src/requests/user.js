require('dotenv/config');
const axios = require('axios')

module.exports = {
    // Encontra os grupos que o usuário requisitante participa, para encontrar o tribunal relacionado
    getTribunal: async(username)=>{
        const response = await axios({
            method: 'GET', url: `${process.env.JIRA_API}/user?username=${username}&expand=groups`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
        })

        const tribunal = getName(response.data.groups.items)

        return tribunal
    }
}

// Pega o nome do tribunal dentre os grupos que o usuário participa
function getName(groups)  {
    for (let i in groups) {
        if (groups[i].name.includes('PJE_TRIBUNAL_')) {
            const name = groups[i].name.split('_')
            return name[2]
        }
    }
    return 'Não encontrado'
}
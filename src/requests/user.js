require('dotenv/config');
const axios = require('axios')

module.exports = {
    getTribunal: async(username)=>{
        console.log(`url getTribunal: ${process.env.JIRA_API}/user?username=${username}&expand=groups`)
        const response = await axios({
            method: 'GET', url: `${process.env.JIRA_API}/user?username=${username}&expand=groups`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
        })

        const tribunal = getName(response.data.groups.items)
        console.log('TRIBUNAL: ' + tribunal)

        return tribunal
    }
}

function getName(groups)  {
    for (let i in groups) {
        if (groups[i].name.includes('PJE_TRIBUNAL_')) {
            const name = groups[i].name.split('_') 
            return name[2]
        }
    }
    return 'Não encontrado'
}
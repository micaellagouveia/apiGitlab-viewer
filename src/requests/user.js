require('dotenv/config');
const axios = require('axios')

module.exports = {
    getGroups: async(username)=>{
        console.log(`${process.env.JIRA_API}/user/username=${username}`)
        const response = await axios({
            method: 'GET', url: `${process.env.JIRA_API}/user?username=${username}&expand=groups`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
        })

        return response.data.groups.items
    }
}
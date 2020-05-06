require('dotenv/config');
const axios = require('axios')

module.exports = {

    // Fecha a issue no gitlab
    closeIssue: async (gitId) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'close'
        }

        const response = await axios.put(`${process.env.GITLAB_API}/${projectId}/issues/${gitId}`, params)

        return response.data
    },

    // Cria a branch no gitlab relacionada à issue do jira
    createBranch: async (jiraKey, summary) => {

        const projectId = process.env.PROJECT_ID
        const name = summary.replace(' ', '-')
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            branch: `${jiraKey}-${name}`,
            ref: 'master'
        }

        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/repository/branches`, params)

        return response.data
    },

    // Muda o status da issue de acordo com o resultado do MR
    statusIssue: async (jiraKey, msg, id) => {
        const json = {
            update: { comment: [{ add: { body: msg } }] },
            transition: { id: id }
        }

        const response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${jiraKey}/transitions?expand=transitions.fields`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data

    },

    // Adiciona o nome do tribunal na descrição da issue
    addTribunal: async (tribunal, jiraKey, description) => {
        const newDescription = `h3. Tribunal Requisitante\r\n ${tribunal}\r\n\r\n` + description
        const json = { fields: { description: newDescription } }

        const addTribunal = await axios({
            method: 'PUT', url: `${process.env.JIRA_API}/issue/${jiraKey}`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return addTribunal.data
    }
}

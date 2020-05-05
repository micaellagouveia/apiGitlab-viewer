require('dotenv/config');
const axios = require('axios')

module.exports = {

    closeIssue: async (gitId) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'close'
        }

        const response = await axios.put(`${process.env.GITLAB_API}/${projectId}/issues/${gitId}`, params)

        return response.data
    },

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

    statusIssue: async (issueKey, msg, id) => {
        const json = {
            update: { comment: [{ add: { body: msg } }] },
            transition: { id: id }
        }

        const response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${issueKey}/transitions?expand=transitions.fields`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data

    },

    addTribunal: async (tribunal, jiraKey, description) => {
        const newDescription = `h3. Tribunal Requisitante\r\n ${tribunal}\r\n\r\n` + description
        const json = { fields: { description: newDescription } }

        const response = await axios({
            method: 'PUT', url: `${process.env.JIRA_API}/issue/${jiraKey}`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data
    }
}

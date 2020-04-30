require('dotenv/config');
const axios = require('axios')

module.exports = {

    closeIssue: async (issueId) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'close'
        }

        const response = await axios.put(`${process.env.GITLAB_API}/${projectId}/issues/${issueId}`, params)

        return response.data
    },

    createBranch: async (jiraKey, summary) => {

        const projectId = process.env.PROJECT_ID
        
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            branch: `${jiraKey}-${summary}`,
            ref: 'master'
        }

        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/repository/branches`, params)

        return response.data
    },

    statusIssue: async (issueKey, msg, id) => {
        const json = {
            update: {comment: [{ add: {body: msg} }]},
            transition: {id: id }
        }

        response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${issueKey}/transitions?expand=transitions.fields`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: json
        })

        return response.data

    }
}
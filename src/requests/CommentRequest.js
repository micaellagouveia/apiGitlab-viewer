require('dotenv/config');
const axios = require('axios')

module.exports = {

    jiraIssue: async (issueKey, msg) => {

        response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${issueKey}/comment`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: { body: msg }
        })

        return response.data
    },

    gitlabIssue: async (issueId, merge) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            body: `Branch <${merge.source_branch}> has been merged, closing issue ${issueId}.`
        }

        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/issues/${issueId}/notes`, params)

        return response.data
    }
}

require('dotenv/config');
const axios = require('axios')

module.exports = {
    // Faz comentário na issue do jira
    jiraIssue: async (jiraKey, msg) => {

        const response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${jiraKey}/comment`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: { body: msg }
        })

        return response.data
    },
 
    // Faz comentário na issue do gitlab
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

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

    commentCloseIssue: async (issueId, merge) => {
        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            body: `Branch <${merge.source_branch}> has been merged, closing issue ${issueId}.`
        }

        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/issues/${issueId}/notes`, params)

        return response.data
    },

    createBranch: async (jiraKey) => {

        const projectId = process.env.PROJECT_ID
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            branch: `${jiraKey}-branch`,
            ref: 'master'
        }
        
        const response = await axios.post(`${process.env.GITLAB_API}/${projectId}/repository/branches`, params)

        return response.data
    },
}
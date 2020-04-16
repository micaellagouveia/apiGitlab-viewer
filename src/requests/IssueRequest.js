require('dotenv/config');
const axios = require('axios')

module.exports = {
    closeIssue: (issueId) => {
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'close'
        }

        return new Promise((resolve) => {
            axios.put(`${process.env.GITLAB_API}/issues/${issueId}`, params).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                resolve(err.response.data)
            })
        })


    },

    commentCloseIssue: (issueId, merge) => {
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            body: `Branch <${merge.source_branch}> has been merged, closing issue ${issueId}.`
        }

        return new Promise((resolve) => {

            axios.post(`${process.env.GITLAB_API}/issues/${issueId}/notes`, params).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                resolve(err.response.data)
            })
        })

    },
}
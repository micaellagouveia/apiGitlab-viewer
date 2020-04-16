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

    reopenIssue: (issue) => {
        const params = {
            private_token: process.env.PRIVATE_TOKEN,
            state_event: 'reopen'
        }

        return new Promise((resolve) => {
            axios.put(`${process.env.GITLAB_API}/issues/${issue.iid}`, params).then((res) => {
                const result = res.body
                resolve(result)
            }).catch((err) => {
                resolve(err.res.body)
            })
        })

    }
}
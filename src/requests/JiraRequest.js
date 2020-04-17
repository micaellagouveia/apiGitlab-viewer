require('dotenv/config');
const axios = require('axios')

module.exports = {
    commentIssue: async (issueKey) => {
        const comment = `Issue ${issueKey} ready to close.`

        response = await axios({
            method: 'POST', url: `${process.env.JIRA_API}/issue/${issueKey}/comment`,
            headers: { Authorization: `Basic ${process.env.AUTHORIZATION_KEY}` },
            data: { body: comment }
        })

        return response.data
    }
}
const routes = require('express').Router()
const endpoints = require('./utils/endpoints')
const Issue = require('./models/Issue')
const MergeRequest = require('./models/MergeRequest')
const JiraIssue = require('./models/JiraIssue')
const issueUtils = require('./utils/IssueUtils')
const issueRequest = require('./requests/IssueRequest')
const jiraRequest = require('./requests/JiraRequest')

routes.get('/', (req, res) => {
    return res.json(endpoints.getJson())
})

routes.post('/issue-webhook', (req, res) => {
    const issue = new Issue(req.body)

    return res.json(issue)

})

routes.post('/close-issue', async (req, res) => {
    const merge = new MergeRequest(req.body)

    if (merge.state === 'merged') {
        const issueId = issueUtils.getIssueId(merge)
        const closeIssue = await issueRequest.closeIssue(issueId)

        if (closeIssue.state === 'closed') {
            const comment = await issueRequest.commentCloseIssue(issueId, merge)
            return res.send(comment.body)
        }
        else {
            return res.send(`ERROR: Issue ${closeIssue.iid} ${closeIssue.state}`)
        }
    }
    else {
    return res.json(merge)
}
})

routes.post('/merge-webhook', (req, res) => {
    const merge = new MergeRequest(req.body)

    return res.json(merge)

})

routes.post('/jira-webhook', async (req, res) => {
    const jiraIssue = new JiraIssue(req.body)
    const comment = await jiraRequest.commentIssue(jiraIssue.key)
    
    console.log("************************************")
    console.log("Id: " + jiraIssue.id)
    console.log("Key: " + jiraIssue.key)
    console.log("Summary: " + jiraIssue.summary)
    console.log("Event: " + jiraIssue.webhookEvent)
    console.log("************************************")
    console.log("Comment: " + comment)
    console.log("************************************")


    return res.json(comment)
})

module.exports = routes
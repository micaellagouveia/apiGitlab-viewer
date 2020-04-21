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

routes.post('/merge-webhook', (req, res) => {
    const merge = new MergeRequest(req.body)

    return res.json(merge)

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


routes.post('/jira-webhook', async (req, res) => {

    console.log('********************')
    console.log(req.body.issue.fields.project)

    /*const obj = req.body.issue.project

    for (var key in obj) { 
        console.log(key, obj[key])
      }*/
    console.log('*********************')
 
    /*if (req.body.webhookEvent === 'jira:issue_created') {
 
        const jiraIssue = new JiraIssue(req.body)

        if (jiraIssue.userKey === 'JIRAUSER11821') {

            const createBranch = await issueRequest.createBranch(jiraIssue.key)
            const comment = await jiraRequest.commentCreatedIssue(jiraIssue.key, createBranch.name)

            return res.json(comment.body)
        } else {
            return res.send(`User key ${jiraIssue.userKey} not found.`)
        }
    }
    else {
        return res.send('Error: Not found issue created')
    }*/
    return res.json(req.body.issue.project)
}),

    routes.post('/close-jira-issue', async (req, res) => {
        const merge = new MergeRequest(req.body)

        if (merge.state === 'merged') {
            const jiraIssueKey = issueUtils.getJiraIssueKey(merge)

            const commentJiraIssue = await jiraRequest.commentIssue(jiraIssueKey)

            return res.send(commentJiraIssue.body)

        }
        else {
            return res.json(merge)
        }
    })

module.exports = routes
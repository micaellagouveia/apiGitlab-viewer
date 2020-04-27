const routes = require('express').Router()
const endpoints = require('./utils/endpoints')
const MergeRequest = require('./models/MergeRequest')
const JiraIssue = require('./models/JiraIssue')
const issueUtils = require('./utils/IssueUtils')
const issueRequest = require('./requests/IssueRequest')
const commentRequest = require('./requests/CommentRequest')

routes.get('/', (req, res) => {
    return res.json(endpoints.getJson())
})

routes.post('/close-gitlab-issue', async (req, res) => {
    const merge = new MergeRequest(req.body)

    if (merge.state === 'merged') {
        const issueId = issueUtils.getIssueId(merge)
        const closeIssue = await issueRequest.closeIssue(issueId)

        if (closeIssue.state === 'closed') {
            const comment = await commentRequest.gitlabIssue(issueId, merge)
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

    console.log(req.body)
    
    if (req.body.issue.fields.project.name === 'Projeto de Teste de Fluxo PJe') {

        if (req.body.webhookEvent === 'jira:issue_updated') {

            console.log(req.body.issue.fields)

            const jiraIssue = new JiraIssue(req.body)
            console.log("********************************")
            console.log("Reporter: " + jiraIssue.reporter)
            console.log("Priority: " + jiraIssue.priority)
            console.log("Labels: " + jiraIssue.labels)
            console.log("Assignee: " + jiraIssue.assignee)
            console.log("Status: " + jiraIssue.status)
            console.log("Creator: " + jiraIssue.creator)
            console.log("AggregateProgress: " + jiraIssue.aggregateprogress)
            console.log("Progress: " + jiraIssue.progress)
            console.log("Votes: " + jiraIssue.votes)
            console.log("Worklog: " + jiraIssue.worklog)
            console.log("Project: " + jiraIssue.project)
            console.log("IssueType: " + jiraIssue.issuetype)
            console.log("Description: " + jiraIssue.description)
            console.log("********************************")

            return res.send("OK")

        }
        else {
            return res.send('Error: Not found created issue.')
        }
    }
    return res.send('Error: Not found project name.')
})

routes.post('/close-jira-issue', async (req, res) => {
    const merge = new MergeRequest(req.body)

    if (merge.state === 'merged') {
        const jiraIssueKey = issueUtils.getJiraIssueKey(merge)

        const comment = await commentRequest.jiraIssue(jiraIssueKey)

        return res.send(comment.body)

    }
    else {
        return res.json(merge)
    }
})

module.exports = routes
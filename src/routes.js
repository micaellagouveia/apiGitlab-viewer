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
    console.log('************************')
    console.log(req.body.issue.fields)
    console.log('************************')

    const project = req.body.issue.fields.project.name

    if (project === 'Projeto de Teste de Fluxo PJe') {

        if (req.body.webhookEvent === 'jira:issue_created' ||
            req.body.issue_event_type_name === 'issue_updated') {

            const jiraIssue = new JiraIssue(req.body)

            const verify = await issueUtils.verifyIssue(jiraIssue.description)

            // se a verificação solicitar mudanças, faz-se o comentário na issue
            if (verify) {
                const comment = await commentRequest.jiraIssue(jiraIssue.key, verify)
                return res.send(comment.body)
            }

            return res.send('Nothing to comment.')

        }
        else {
            return res.send('Error: Not found created or updated issue event.')
        }
    }
    return res.send('Error: Not found project name.')
})

routes.post('/merge-webhook', async (req, res) => {

    console.log(req.body)

    const merge = new MergeRequest(req.body)

    if(merge.state === 'opened'){
        // mudar jira issue para resolvida
        const jiraIssueKey = issueUtils.getJiraIssueKey(merge)
        console.log(jiraIssueKey)
        const msg = "* MR aberto, esperando aprovação\n * Issue Resolvida."
        const id = '5'
        const resolved = await issueRequest.statusIssue(jiraIssueKey, msg, id)
        console.log(resolved)
        return res.json(resolved)
    }
    if(merge.state === 'closed'){
        //mudar jira issue para reaberta
    }


   /* if (merge.state === 'merged') {
       //mudar jira issue para homologação técnica
        const jiraIssueKey = issueUtils.getJiraIssueKey(merge)
        const msg = `Issue <${jiraIssueKey}> is ready to close.`

        const comment = await commentRequest.jiraIssue(jiraIssueKey, msg)

        return res.send(comment.body)

    }
    else {
        return res.json(merge)
    }*/
    return res.json(merge)
})

module.exports = routes
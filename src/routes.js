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

    const project = req.body.issue.fields.project.name
    let branchComment = ''

    if (project === 'Projeto de Teste de Fluxo PJe') {

        const jiraIssue = new JiraIssue(req.body)

        // Issue criada, branch será criada
        if (req.body.webhookEvent === 'jira:issue_created') {

            const branch = await issueRequest.createBranch(jiraIssue.key, jiraIssue.summary.replace(' ', '-'))
            const msg = `Created branch "${branch.name}" related to this issue on gitlab.`

            branchComment = await commentRequest.jiraIssue(jiraIssue.key, msg)
        }

        // Verificação da descrição para issues criadas e issues atualizadas
        if (branchComment || req.body.issue_event_type_name === 'issue_updated') {

            console.log('***********************')
            console.log(req.body.issue.fields)
            console.log('***********************')

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

    const merge = new MergeRequest(req.body)

    let msg = ''
    let id = ''
    const jiraIssueKey = issueUtils.getJiraIssueKey(merge)

    switch (merge.state) {
        case 'opened':
            msg = "* MR aberto, esperando aprovação.\n * Issue Resolvida."
            id = '5'
            break
        case 'closed':
            msg = '* MR reprovado.\n * Issue Reaberta.'
            id = '3'
            break
        case 'merged':
            msg = '* MR aprovado.\n * Issue Fechada.'
            id = '701'
            break
        default:
            return res.json(merge.state)
    }
    const resolved = await issueRequest.statusIssue(jiraIssueKey, msg, id)

    return res.json(resolved)
})

module.exports = routes
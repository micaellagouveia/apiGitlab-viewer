const routes = require('express').Router()
const endpoints = require('./utils/endpoints')
const MergeRequest = require('./models/MergeRequest')
const JiraIssue = require('./models/JiraIssue')
const issueUtils = require('./utils/issue')
const issueRequest = require('./requests/issue')
const commentRequest = require('./requests/comment')
const userRequest = require('./requests/user')

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
    let description = ''

    if (project === 'Projeto de Teste de Fluxo PJe') {
        console.log('2')

        const jiraIssue = new JiraIssue(req.body)

        // Issue criada, branch será criada
        if (req.body.webhookEvent === 'jira:issue_created') {
            console.log('3')

            const branch = await issueRequest.createBranch(jiraIssue.key, jiraIssue.summary.replace(' ', '-'))
            const msg = `Created branch "${branch.name}" related to this issue on gitlab.`

            branchComment = await commentRequest.jiraIssue(jiraIssue.key, msg)

            //Encontrar Tribunal
            const tribunal = await userRequest.getTribunal(jiraIssue.reporter)
            description = await issueRequest.addTribunal(tribunal, jiraIssue.key, jiraIssue.description)

        }

        // Verificação da descrição para issues criadas e issues atualizadas
        if (branchComment || req.body.issue_event_type_name === 'issue_updated') {

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
}),

    routes.post('/user', async (req, res) => {
        const username = req.body.name
        const groups = await userRequest.getUserGroups(username)
        const tribunal = await userUtil.getTribunal(groups)
        return res.json(tribunal)
    })

module.exports = routes
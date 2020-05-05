const routes = require('express').Router()
const endpoints = require('./utils/endpoints')
const MergeRequest = require('./models/MergeRequest')
const JiraIssue = require('./models/JiraIssue')
const issueUtil = require('./utils/issue')
const issueRequest = require('./requests/issue')
const commentRequest = require('./requests/comment')
const userRequest = require('./requests/user')

routes.get('/', (req, res) => {
    return res.json(endpoints.getJson())
})

routes.post('/jira-webhook', async (req, res) => {
    const project = req.body.issue.fields.project.name
    let branchComment = ''

    if (project === 'Projeto de Teste de Fluxo PJe') {
        console.log('1')

        const jira = new JiraIssue(req.body)

        if (jira.webhookEvent === 'jira:issue_created') {
            console.log('2')
            //Criação da branch no gitlab
            const branch = await issueRequest.createBranch(jira.key, jira.summary.replace(' ', '-'))
            console.log('3')
            const msg = `Branch "${branch.name}" criada no Gitlab.`

            branchComment = await commentRequest.jiraIssue(jira.key, msg)
            console.log('4')

            //Encontrar Tribunal
            const tribunal = await userRequest.getTribunal(jira.reporter)
            console.log('5')

            await issueRequest.addTribunal(tribunal, jira.key, jira.description)
            console.log('6')

        }
        // Verificação da descrição para issues criadas e issues atualizadas
        if (jira.eventType === 'issue_updated') {

            console.log(req.body.issue.fields)
            console.log('******************************')
            console.log(jira.files)
            const verify = await issueUtil.verifyIssue(jira.description, jira.files)
            console.log('8')

            
            // se a verificação solicitar mudanças, faz-se o comentário na issue
            if (verify) await commentRequest.jiraIssue(jira.key, verify)
        }
    }

    return res.json(req.body)
})

routes.post('/merge-webhook', async (req, res) => {
    const merge = new MergeRequest(req.body)
    const jiraKey = issueUtil.getJiraIssueKey(merge)
    let msg = ''
    let id = ''

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

    const status = await issueRequest.statusIssue(jiraKey, msg, id)

    return res.json(status)
})

module.exports = routes
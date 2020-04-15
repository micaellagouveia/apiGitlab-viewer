const routes = require('express').Router()
const Issue = require('./models/Issue')
const MergeRequest = require('./models/MergeRequest')
const issueUtils = require('./utils/IssueUtils')
const issueRequest = require('./requests/IssueRequest')

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'World !' })
})

routes.post('/issue-webhook', async (req, res) => {

    const issue = new Issue(req.body)

    console.log("************************")
    // console.log("Title: " + req.body.object_attributes.title)
    console.log("Id: " + issue.id)
    console.log("Num: " + issue.iid)
    console.log("State: " + issue.state)
    console.log("Action: " + issue.action)
    console.log("************************")

    return res.json(issue)

}),

    routes.post('/close-issue', async (req, res) => {
        const issue = new Issue(req.body)
        console.log('1 post')
        issueRequest.closeIssue(issue).then((closeIssue) => {
            console.log("************************")
            console.log("State: " + closeIssue.state)
            console.log("************************")
            if (closeIssue.state === 'closed') return res.send(`Issue ${closeIssue.iid}: ${closeIssue.state}`)
            return res.send(`ERROR: Issue ${closeIssue.iid}: ${closeIssue.state}`)
        }).catch((err) => {
            return res.send(err)
        })
    }),

    routes.post('/merge-webhook', async (req, res) => {

        const merge = new MergeRequest(req.body)

        console.log("************************")
        console.log("Name: " + merge.project_name)
        console.log("Iid: " + merge.iid)
        console.log("Merge status: " + merge.merge_status)
        console.log("State: " + merge.state)
        console.log("Source branch: " + merge.source_branch)
        console.log("Target branch: " + merge.target_branch)
        console.log("************************")

        return res.json(merge)

    }),



    module.exports = routes
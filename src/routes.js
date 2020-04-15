const routes = require('express').Router()
const Issue = require('./models/Issue')
const MergeRequest = require('./models/MergeRequest')
const issueUtils = require('./utils/IssueUtils')

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

  //  if (issueUtils.open()) {
        // requisição para jira para criação de issue
 //   }

    if (issue.state === 'closed') {
        // requisição para apagar branch
    }

    return res.json(issue)

})

routes.post('/merge-webhook', async (req, res) => {
    
    const merge = new MergeRequest(req.body)

    console.log("************************")
    console.log("Name: " + merge.project_name)
    console.log("Id: " + merge.id)
    console.log("Merge status: " + merge.merge_status)
    console.log("State: " + merge.state)
    console.log("Source branch: " + merge.source_branch)
    console.log("Target branch: " + merge.target_branch)
    console.log("************************")

    return res.json(merge)

})



module.exports = routes
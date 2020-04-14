const routes = require('express').Router()
const Issue = require('./models/Issue')

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'World !' })
})

routes.post('/webhooks', async (req, res) => {

    if (req.body.object_kind === 'issue') {

        const issue = new Issue(req.body)

        console.log("************************")
        console.log("Name Project: " + issue.project_name)
        console.log("Id: " + issue.id)
        console.log("Num: " + issue.iid)
        console.log("State: " + issue.state)
        console.log("Action: " + issue.action)
        console.log("************************")

        return res.json(issue)
    }
    else {
        return res.json(req.body)
    }
})



module.exports = routes
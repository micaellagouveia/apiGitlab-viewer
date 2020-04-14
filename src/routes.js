const routes = require('express').Router()

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'World !' })
})

routes.post('/issue-webhook', async (req, res) => {

    const body = req.body

    console.log("************************")
    console.log("Name Project: " + body.project.name)
    console.log("Id: " + body.object_attributes.id)
    console.log("Num: " + body.object_attributes.iid)
    console.log("State: " + body.object_attributes.state)
    console.log("************************")
    return res.json(req.body)
})



module.exports = routes
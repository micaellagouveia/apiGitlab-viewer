const routes = require('express').Router()

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'World !' })
})

routes.post('/webhooks', async (req, res) => {
    /*const webhooks = async () => {
        try {
            return await axios.get(process.env.GITLAB_API)
        } catch (error) {
            console.error(error)
        }

    }*/

    console.log("************************")
    console.log(req.body)
    console.log("************************")
    return res.json(req.body)
})


module.exports = routes
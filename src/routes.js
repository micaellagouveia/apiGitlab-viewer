const routes = require('express').Router()
const axios = require('axios')

routes.get('/', async (req, res) => {
    return res.json({ Hello: 'World !' })
})

routes.get('/webhooks', async (req, res) => {
    const webhooks = async () => {
        try {
            return await axios.get(process.env.GITLAB_API)
        } catch (error) {
            console.error(error)
        }
    }

    return res.json(webhooks)
})
/*
axios('/webhooks', {
    url: process.env.GITLAB_API ,
    method: 'GET',
  }).then(req => req.body
  ).catch(error => {
    throw error
  })
*/

module.exports = routes
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express()

app.use(express.json())
app.use(bodyParser);
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(require('./routes'))

app.listen(process.env.PORT || 3000)

const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cw-clone'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1'],
    maxAge: 24 * 60 * 60 * 1000,
  }),
)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke on the server side!')
})

app.use(express.json())

app.use('/api', ApiRouter)
app.use('/account', AccountRouter)
// app.get('/favicon.ico', (req, res) => {
//   res.status(404).send()
// })
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

app.listen(3000, () => {
  console.log('listening on 3000')
})

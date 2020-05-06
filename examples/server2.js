const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const router = express.Router()

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type',
}

router.post('more/serve2', function(req, res) {
  debugger
  res.set(cors)
  res.json(req.cookies)
})

router.options('more/serve2', function(req, res) {
  debugger
  res.set(cors)
  res.end()
})


app.use(router)

const port = 8088
module.exports = app.listen(port)
  // , () => {
  // console.log(`Server listening on http://127.0.0.1:${port}, Ctrl+C to stop`)
// })

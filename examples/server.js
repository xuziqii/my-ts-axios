const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)



app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const router = express.Router()

// simple
generateSimpleRoute()
// base
generateBaseRoute()
// post
generatePostRoute()
// error
generateErrorRoute()

// interceptor
generateInterceptorRoute()

// config
generateConfigRoute()

// cancel
generateCancelRoute()

// credentials
generateCredentialsRoute()



function generateInterceptorRoute () {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}

function generateSimpleRoute () {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello TypeScript`
    })
  })
}

function generateBaseRoute () {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
}

function generatePostRoute () {
  router.post('/post/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })

    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
  router.post('/post/base', function(req, res) {
    res.json(req.body)
  })
}

function generateErrorRoute () {
  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        message: 'hello timeout'
      })
    }, 3000)
  })

  router.get('/error/get', function(req, res) {
    if (Math.random() < 0.5) {
      res.json({
        message: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
}

function generateConfigRoute () {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function generateCancelRoute () {
  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json({
        message: 'hello cancel'
      })
    }, 1000)
  })
}

function generateCredentialsRoute () {
  router.get('/credentials/get', function(req, res) {
    res.json(req.cookies)
  })
}

app.use(router)

const port = process.env.PORT || 9000
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

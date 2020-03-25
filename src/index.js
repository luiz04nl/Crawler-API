import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import morgan from 'morgan'
import ApiConfig from './config/api.conf'
import Cors from './core/Cors'
import Routers from './core/Routers'
import Response from './core/Response'

const config = new ApiConfig()
const environment = config.getEnv()
const app = express()
const cors = new Cors()
const routers = new Routers()
const response = new Response()

process.on('SIGINT', function () {
  db.stop(function (err) {
    process.exit(err ? 1 : 0)
  })
})

process.prependListener('uncaughtException', (error) => {
  console.error(error)
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(compression({ threshold: 100 }))

// Set express app in Response class
response.setApp(app)

/**
 * Use routes in app
 * @private
 */
const _setupRouters = () => {
  routers.syncRouters(app)
}

/**
 * Console log output
 * @param text
 * @private
 */
const _appLog = (text) => {
  if (config.getEnvName() !== 'test') {
  }
}

/**
 * Set the HTTP headers for cors and others
 * @private
 */
const _setupCors = () => {
  cors.setCors(app, environment.server.cors)
}

// Define cors headers
_setupCors()

_setupRouters()

/**
 * After Express listen with success run the setups functions...
 * @private
 */
const _listenSuccess = () => {
  // Print in console app status
  _appLog(
    `\n${environment.app.name} on at ${environment.server.host}:${environment.server.port}\n`
  )

  _appLog('API ON')
}

// No use logs in test environment!
if (config.getEnvName() !== 'test') {
  app.use(morgan(config.getEnvName() === 'development' ? 'dev' : 'combined'))
}

// Create secure server or insecure server (see your *.env.js)
const server = app

// Listen server
server.listen(environment.server.port, environment.server.host, _listenSuccess)

export default app

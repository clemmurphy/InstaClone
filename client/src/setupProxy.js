const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 4000

module.exports = function (app){
  app.use(createProxyMiddleware('/api', { target: port }))
}
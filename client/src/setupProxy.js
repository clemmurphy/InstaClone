const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app){
  app.use(createProxyMiddleware('/api', { target: `${process.env.port}` || '4000' }))
}
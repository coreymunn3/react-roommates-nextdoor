const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'https://roommates-fullstack.herokuapp.com';

module.exports = function (app) {
  app.use(
    ['/api', '/auth/google', '/logout'],
    createProxyMiddleware({
      target: target,
    })
  );
};

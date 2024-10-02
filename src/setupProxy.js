const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://test-api.achilyon.in',
      changeOrigin: true,
      pathRewrite: {
        '^/v1': '/v1',
      },
    })
  );
};

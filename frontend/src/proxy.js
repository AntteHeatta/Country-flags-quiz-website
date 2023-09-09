const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/", // Change this to match your backend's API endpoint
    createProxyMiddleware({
      target: "http://localhost:8080", // Address of your Spring backend
      changeOrigin: true,
    })
  );
};

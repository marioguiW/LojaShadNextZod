import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://localhost:7148',
  changeOrigin: true,
  pathRewrite: {
    '^/api/refresh': '/v1/refresh',  // ajuste conforme necessário
  },
});
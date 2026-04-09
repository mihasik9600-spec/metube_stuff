const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const AUTH_HEADER = process.env.METUBE_AUTHORIZATION || 'Basic dXNlcjpwYXNz';
const METUBE_URL = process.env.METUBE_URL || 'http://your-metube.railway.internal:8081';

app.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (auth !== AUTH_HEADER) {
    return res.status(401).set('WWW-Authenticate', 'Basic realm="MeTube"').send('Unauthorized');
  }
  next();
});

app.use('/', createProxyMiddleware({ target: METUBE_URL, changeOrigin: true, ws: true }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Proxy on ${port}`));
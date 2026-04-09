const express = require('express');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    const url = 'https://example.com' + req.url; // Replace with actual target URL
    req.pipe(request(url)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
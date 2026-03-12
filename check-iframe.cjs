const https = require('https');

https.get('https://studio.creativefabrica.com/ai-image-editor', (res) => {
  console.log('x-frame-options:', res.headers['x-frame-options']);
  console.log('content-security-policy:', res.headers['content-security-policy']);
});

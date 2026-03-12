const https = require('https');

const urls = [
  'https://lfs.creativefabrica.com/studio/images/og/ai-image-editor.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/ai-image-generator.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/ai-photo-styles.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/photo-styles.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/image-vectorizer.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/image-upscaler.jpeg',
  'https://lfs.creativefabrica.com/studio/images/og/background-remover.jpeg'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, '=>', res.statusCode);
  });
});

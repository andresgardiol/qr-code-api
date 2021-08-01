const express = require('express');
const {PassThrough} = require("stream");
const router = express.Router();
const QRCode = require('qrcode');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const urlParts = req.url.split('?');
  let text = 'https://simple-qr-generator.vercel.app/';
  if (urlParts[1]) {
    let pair = urlParts[1].split("&");

    let keyValue = pair[0].split("=");
    text = decodeURIComponent(keyValue[1]);

  }
  const qrStream = new PassThrough();
  await QRCode.toFileStream(qrStream, text,
      {
        type: 'png',
        width: 500,
        errorCorrectionLevel: 'M'
      }
  );


  res.writeHead(200, {
    'Content-Type': 'img/png'
  });

  qrStream.pipe(res);
  res.send('respond with a resource');
});

module.exports = router;

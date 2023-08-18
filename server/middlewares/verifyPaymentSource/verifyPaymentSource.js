import crypto from 'crypto';

const secondKey = process.env.SECOND_KEY;

function verifyPaymentSource(req, res, next) {
  const { headers, body } = req;
  const signatureHeader = headers['openpayu-signature'];

  if (!signatureHeader) {
    return res.status(403).json({
      message: 'Missing or invalid signature header',
    });
  }

  const keyValuePairs = signatureHeader
    .replace(/'/g, '')
    .split(';')
    .map(pair => pair.trim().split('='));

  const headersObject = Object.fromEntries(keyValuePairs);
  const algorithm = headersObject.algorithm;

  const concatenated = JSON.stringify(body) + secondKey;
  const expectedSignature = crypto
    .createHash(algorithm)
    .update(concatenated)
    .digest('hex');

  const incomingSignature = headersObject.signature;
  if (incomingSignature === expectedSignature) {
    next();
  } else {
    return res.status(403).json({
      message: 'Wrong signature',
    });
  }
}

export default verifyPaymentSource;

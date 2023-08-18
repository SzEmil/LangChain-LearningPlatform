import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
dotenv.config();

// const payUIPs = [
//   '185.68.14.10',
//   '185.68.14.11',
//   '185.68.14.12',
//   '185.68.14.26',
//   '185.68.14.27',
//   '185.68.14.28',
// ];
const privateApiKey = process.env.PRIVATE_API_KEY;
const secretKey = process.env.SECRET_KEY;

export const checkApiKey = (req, res, next) => {
  const encryptedKey = req.headers['x-api-key'];
  if (!encryptedKey) {
    return res.status(403).json({ error: 'API key is required' });
  }

  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedKey, secretKey);
    const decryptedApiKey = decryptedBytes.toString(CryptoJS.enc.Utf8);

    console.log(decryptedApiKey == privateApiKey);

    if (decryptedApiKey === privateApiKey) {
      next();
    } else {
      res.status(403).json({ error: 'Invalid API key' });
    }
  } catch (error) {
    // console.error(error);
    res.status(403).json({ error: 'Invalid API key' });
  }
};

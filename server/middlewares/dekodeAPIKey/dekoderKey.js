import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
dotenv.config();

// const privateApiKey = process.env.PRIVATE_API_KEY;
// const secretKey = process.env.DECODE_KEY;

// export const checkApiKey = (req, res, next) => {
//   const encodedKey = req.headers['x-api-key'];
//   console.log(encodedKey === privateApiKey);
//   if (!encodedKey) {
//     return res.status(403).json({ error: 'API key is required' });
//   }

//   try {
//     if (encodedKey === privateApiKey) {
//       console.log('APi key is correct');
//       next();
//     }
//     if (encodedKey !== privateApiKey) {
//       return res.status(403).json({ error: 'Invalid API key' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(403).json({ error: 'Invalid API key' });
//   }
// };

const privateApiKey = process.env.privateApiKey;
const secretKey = process.env.secretKey;

// console.log(privateApiKey, secretKey);
export const checkApiKey = (req, res, next) => {
  const encryptedKey = req.headers['x-api-key'];
//   console.log(privateApiKey);
//   console.log('key from front:', encryptedKey);
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

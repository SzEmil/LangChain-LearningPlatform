import CryptoJS from 'crypto-js';


const secretKey = import.meta.env.VITE_SECRET_KEY;

 const apiKeyData = import.meta.env.VITE_PRIVATE_KEY;

export const apiKey = CryptoJS.AES.encrypt(apiKeyData, secretKey).toString();

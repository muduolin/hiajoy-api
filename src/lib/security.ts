import CryptoJS from 'crypto-js';

const salt = "047c9fb4-a4a0-4cdc-96d2-142cb37dafe5";
export function encrypt (text: string) {
    return CryptoJS.AES.encrypt(text, salt).toString();
}

export function decrypt (encryptedText: string) {
    return CryptoJS.AES.decrypt(encryptedText, salt).toString(CryptoJS.enc.Utf8);
}

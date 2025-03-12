import crypto from "crypto";

export const generteSecretKey = (secretKey: string) => {
    const generatedBuffer = crypto.createHash("sha256").update(secretKey).digest();
    const key = generatedBuffer.toString("hex")
    return key;
};

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

export const encryptString = (plainText: string,secretKey:string): string => {
    const genKey = generteSecretKey(secretKey);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(genKey, "hex"), iv);
    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
};

export const decryptString = (encryptedText: string,secretKey:string) => {
    const [ivHex, encryptedData] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const genKey = generteSecretKey(secretKey);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(genKey, "hex"), iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
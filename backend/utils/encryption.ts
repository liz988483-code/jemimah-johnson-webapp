import crypto from 'crypto'

// Generate a random encryption key (32 bytes for AES-256)
export const generateEncryptionKey = (): Buffer => {
  return crypto.randomBytes(32)
}

// Generate a random initialization vector (16 bytes for AES)
export const generateIV = (): Buffer => {
  return crypto.randomBytes(16)
}

// Encrypt data using AES-256-CBC
export const encrypt = (data: Buffer | string, key: string, iv?: string): { encrypted: string; iv: string } => {
  const keyBuffer = Buffer.from(key, 'hex')
  const ivBuffer = iv ? Buffer.from(iv, 'hex') : generateIV()
  
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer)
  
  let encrypted: Buffer
  if (Buffer.isBuffer(data)) {
    encrypted = Buffer.concat([cipher.update(data), cipher.final()])
  } else {
    encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()])
  }
  
  return {
    encrypted: encrypted.toString('hex'),
    iv: ivBuffer.toString('hex')
  }
}

// Decrypt data using AES-256-CBC
export const decrypt = (encryptedHex: string, key: string, iv: string): Buffer => {
  const keyBuffer = Buffer.from(key, 'hex')
  const ivBuffer = Buffer.from(iv, 'hex')
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex')
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer)
  
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()])
  
  return decrypted
}

// Encrypt a file
export const encryptFile = (fileBuffer: Buffer, key: string): { encrypted: string; iv: string } => {
  return encrypt(fileBuffer, key)
}

// Decrypt a file
export const decryptFile = (encryptedHex: string, key: string, iv: string): Buffer => {
  return decrypt(encryptedHex, key, iv)
}

// Hash a file for integrity verification
export const hashFile = (data: Buffer | string): string => {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Generate a secure key from a password
export const deriveKeyFromPassword = (password: string, salt: string): string => {
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256')
  return key.toString('hex')
}

// Generate a random salt for key derivation
export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('hex')
}

// Get or create encryption key from environment
export const getEncryptionKey = (): string => {
  const key = process.env.ENCRYPTION_KEY
  if (!key) {
    // Generate a new key if not exists (for development)
    console.warn('ENCRYPTION_KEY not found in environment variables. Using generated key.')
    return generateEncryptionKey().toString('hex')
  }
  return key
}

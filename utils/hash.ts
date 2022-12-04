import crypto from "crypto-js"
import config from "../app/config"

export const AES = (data: string) => {
  return crypto.AES.encrypt(data, config.hash.hash_secret as string).toString()
}

export const AESparse = (data: string) => {
  return crypto.AES.decrypt(data, config.hash.hash_secret as string).toString(crypto.enc.Utf8)
}

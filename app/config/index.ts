const config = {
  server: {
    port: process.env.SERVER_PORT
  },
  db: {
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire: process.env.JWT_EXPIRE
  },
  hash: {
    hash_secret: process.env.HASH_SECRET
  }
}

export default config

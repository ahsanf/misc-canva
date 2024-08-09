import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST ?? ''
const DB_NAME = process.env.DB_NAME ?? ''
const DB_USERNAME = process.env.DB_USERNAME ?? ''
const DB_PASSWORD = process.env.DB_PASSWORD ?? ''
const DB_PORT = process.env.DB_PORT ?? ''

const APP_PORT = process.env.APP_PORT ?? ''
const APP_SALT = process.env.APP_SALT ?? ''
const APP_SALT_IV = process.env.APP_SALT_IV ?? ''
const APP_ENCRYPT_METHOD = process.env.APP_ENCRYPT_METHOD ?? ''
const API_VERSION = process.env.API_VERSION ?? ''
const APP_NAME = process.env.APP_NAME ?? ''
const APP_UPLOAD_PATH = process.env.APP_UPLOAD_PATH ?? ''

const MAIL_HOST = process.env.MAIL_HOST ?? ''
const MAIL_PORT = process.env.MAIL_PORT ?? ''
const MAIL_USER = process.env.MAIL_USER ?? ''
const MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? ''
const MAIL_SECURE = process.env.MAIL_SECURE ?? ''

const SERVER_TOKEN_EXPRIRETIME = process.env.SERVER_TOKEN_EXPRIRETIME ?? 3600
const VALIDATION_CODE_EXPIRETIME = process.env.VALIDATION_CODE_EXPIRETIME ?? 900
const REFRESH_TOKEN_EXPIRETIME = process.env.REFRESH_TOKEN_EXPIRETIME ?? 86400

const MONGO_DB_HOST = process.env.MONGO_DB_HOST ?? ''
const MONGO_DB_USER = process.env.MONGO_DB_USER ?? ''
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD ?? ''
const MONGO_PRE_URL = process.env.MONGO_PRE_URL ?? ''

const STABILITY_API_KEY = process.env.STABILITY_API_KEY ?? ''
const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY ?? ''
const CLIPDROP_API_URL = process.env.CLIPDROP_API_URL ?? ''

const REDIS_URL = process.env.REDIS_URL ?? ''
const REDIS_ENABLE = process.env.REDIS_ENABLE ?? false

const TEXT_TO_IMAGE_RESOLUTION = process.env.TEXT_TO_IMAGE_RESOLUTION ?? 768
const MAX_FREE_PROJECT = process.env.MAX_FREE_PROJECT ?? 20

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ?? ''
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN ?? ''
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? ''
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET ?? ''
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID ?? ''
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID ?? ''
const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID ?? ''

const AZURE_BLOB_SERVICE_SAS_URL = process.env.AZURE_BLOB_SERVICE_SAS_URL ?? ''
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME ?? ''
const AZURE_SAS_TOKEN = process.env.AZURE_SAS_TOKEN ?? ''
const STATIC_TOKEN = process.env.STATIC_TOKEN ?? undefined
const AZURE_FUNCTION_URL = process.env.AZURE_FUNCTION_URL ?? ''
const STABILITY_API_URL = process.env.STABILITY_API_URL ?? ''

const RABBIT_MQ_HOST = process.env.RABBIT_MQ_HOST ?? ''
const RABBIT_MQ_PORT = process.env.RABBIT_MQ_PORT ?? ''
const RABBIT_MQ_USER = process.env.RABBIT_MQ_USER ?? ''
const RABBIT_MQ_PASSWORD = process.env.RABBIT_MQ_PASSWORD ?? ''

const APP_CONFIG = {
  appPort: APP_PORT,
  appSalt: APP_SALT,
  appSaltIv: APP_SALT_IV,
  appEncryptMethod: APP_ENCRYPT_METHOD,
  apiVersion: API_VERSION,
  appName: APP_NAME,
  stabilityApiKey: STABILITY_API_KEY,
  stabilityApiUrl: STABILITY_API_URL,
  clipdropApiKey: CLIPDROP_API_KEY,
  clipdropApiUrl: CLIPDROP_API_URL,
  redisEnable: REDIS_ENABLE,
  textToImageResolution: TEXT_TO_IMAGE_RESOLUTION,
  uploadPath: APP_UPLOAD_PATH,
  maxFreeProject: MAX_FREE_PROJECT,
  staticToken: STATIC_TOKEN,
  
}

const SERVER_CONFIG = {
  tokenExpireTime: SERVER_TOKEN_EXPRIRETIME,
  validationCodeExpireTime: VALIDATION_CODE_EXPIRETIME,
  refreshTokenExpireTime: REFRESH_TOKEN_EXPIRETIME,
}

const MYSQL_CONFIG = {  
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  debug: true,
};

const MONGO_CONFIG = {
  host: MONGO_DB_HOST,
  user: MONGO_DB_USER,
  password: MONGO_DB_PASSWORD,
  preUrl: MONGO_PRE_URL,
}

const MAIL_CONFIG = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  }
}

const REDIS_CONFIG = {
  url: REDIS_URL,
}

const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

const AZURE_CONFIG = {
  blobServiceSasUrl: AZURE_BLOB_SERVICE_SAS_URL,
  containerName: AZURE_CONTAINER_NAME,
  sasToken: AZURE_SAS_TOKEN,
  functionUrl: AZURE_FUNCTION_URL
}

const RABBIT_MQ_CONFIG = {
  host: RABBIT_MQ_HOST,
  port: RABBIT_MQ_PORT,
  user: RABBIT_MQ_USER,
  password: RABBIT_MQ_PASSWORD,
}

export const config: any = {
  app: APP_CONFIG,
  server: SERVER_CONFIG,
  database: {
    mysql : MYSQL_CONFIG,
    mongo: MONGO_CONFIG,
    redis: REDIS_CONFIG
  },
  rabbitMq: RABBIT_MQ_CONFIG,
  mail: MAIL_CONFIG,
  firebase: FIREBASE_CONFIG,
  azure: AZURE_CONFIG,
};

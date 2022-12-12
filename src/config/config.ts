import { IConfig } from './../interfaces/IConfig';
import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    PORT: Joi.number().default(process.env.PORT || 1336),
    CREATE_ADMIN_FLAG: Joi.boolean().default(process.env.CREATE_ADMIN_FLAG || false),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    DB_NAME: Joi.string().required().description('DB Name'),
    AWS_ACCESS_KEY: Joi.string().required().description('Aws Access key.'),
    AWS_SECRET_KEY: Joi.string().required().description('Aws Secret key.'),
    AWS_REGION: Joi.string().required().description('Aws region required.'),
    AWS_BUCKET: Joi.string().required().description('Aws Bucket Name.'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_TIME: Joi.string().description('minutes after which access tokens expire'),
    JWT_RESET_EXPIRATION_TIME: Joi.string().default(10).description('minutes after which reset password token expires'),
    SENDGRID_API_KEY: Joi.string().required().description('SendGrid Api key is required'),
    SENDGRID_SENDER_EMAIL: Joi.string().required().description('SendGrid sender email is required'),
    AWS_MAX_FILE_UPLOAD_SIZE_MB: Joi.string().default(process.env.AWS_MAX_FILE_UPLOAD_SIZE_MB || 2),
    AWS_MAX_FILES_UPLOAD_ALLOW: Joi.string().default(process.env.AWS_MAX_FILES_UPLOAD_ALLOW || 5),
    NODE_MAILER_EMAIL: Joi.string().required().description('gmail sender email'),
    NODE_MAILER_PASSWORD: Joi.string().required().description('gmail sender pass'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

//* ERROR CASE
if (error) {
  throw new Error(`Configuration validation error' :  ${error.message}`);
}

const config: IConfig = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  AUTH_HEADER_PREFIX: 'Bearer ',
  sendgrid: {
    apikey: envVars.SENDGRID_API_KEY,
    senderEmail: envVars.SENDGRID_SENDER_EMAIL,
  },
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      dbName: envVars.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    accessExpirationTime: envVars.JWT_ACCESS_EXPIRATION_TIME,
    resetExpirationTime: envVars.JWT_RESET_EXPIRATION_TIME,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_KEY,
    region: envVars.AWS_REGION,
    bucket: envVars.AWS_BUCKET,
    maxFileSize: envVars.AWS_MAX_FILE_UPLOAD_SIZE_MB,
    maxUploads: envVars.AWS_MAX_FILES_UPLOAD_ALLOW,
  },
  gmail: {
    email: envVars.NODE_MAILER_EMAIL,
    pass: envVars.NODE_MAILER_PASSWORD,
  },
  createAdmin: envVars.CREATE_ADMIN_FLAG,
};

export default config;

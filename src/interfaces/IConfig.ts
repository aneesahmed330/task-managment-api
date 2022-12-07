export interface IConfig {
  env: string;
  port: number;
  jwtSecret: string;
  AUTH_HEADER_PREFIX: string;
  sendgrid: {
    apikey: string;
    senderEmail: string;
  };
  mongoose: {
    url: string;
    options: {
      dbName: string;
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
    };
  };
  jwt: {
    accessExpirationTime: string;
    resetExpirationTime: string;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    maxFileSize: number;
    maxUploads: number;
  };
}

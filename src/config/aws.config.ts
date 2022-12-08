import AWS from 'aws-sdk';
import config from './config';

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});
export default AWS;

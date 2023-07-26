import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../../serverless.base';

const isOffline = process.env.IS_OFFLINE === 'true';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'payment-service',
  functions: {
    hello: {
      handler: isOffline ? 'src/main.hello' : 'main.hello',
    },
  },
};

module.exports = serverlessConfiguration;

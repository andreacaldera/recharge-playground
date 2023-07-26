import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../../serverless.base';

const isOffline = process.env.IS_OFFLINE === 'true';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    stage: '${opt:stage}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'eu-west-2',
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['lambda:InvokeFunction'],
      Resource: '*',
    },
  ],
  service: 'payment-service',
  functions: {
    hello: {
      handler: isOffline ? 'src/main.hello' : 'main.hello',
    },
  },
};

module.exports = serverlessConfiguration;

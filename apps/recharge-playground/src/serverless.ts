import type { Serverless } from 'serverless/aws';

const serverlessConfiguration = <Serverless>{
  frameworkVersion: '3',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: [],

  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    stage: 'dev', // todo dev / prod / prs
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'eu-west-2',
  },
  service: 'recharge-playwright-nestjs',
  functions: {
    index: {
      handler: 'main.handler',
      events: [
        {
          http: {
            cors: true,
            method: 'any',
            path: '/',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;

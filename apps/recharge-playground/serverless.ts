import type { Serverless } from 'serverless/aws';

const isOffline = process.env.IS_OFFLINE === 'true';

console.log(`is offline?`, isOffline);

const { baseServerlessConfiguration } = isOffline
  ? require('../../serverless.base')
  : require('../../../serverless.base');

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
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

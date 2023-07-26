import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../serverless.base';

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

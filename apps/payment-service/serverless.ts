import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../../serverless.base';

const isOffline = process.env.IS_OFFLINE === 'true';

console.log(`is offline?`, isOffline);

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'payment-service',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      packager: 'pnpm',
    },
  },
  functions: {
    hello: {
      handler: isOffline ? 'src/main.hello' : 'main.hello',
    },
  },
};

module.exports = serverlessConfiguration;

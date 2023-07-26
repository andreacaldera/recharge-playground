import type { Serverless } from 'serverless/aws';

const isOffline = true; // process.env.IS_OFFLINE === 'true';

console.log(`SLS offline mode: ${isOffline}`);

const serverlessConfiguration = <Serverless>{
  // todo use parent config
  frameworkVersion: '3',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: isOffline ? ['serverless-esbuild', 'serverless-offline'] : [],
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
  service: 'payment-service',
  functions: {
    hello: {
      handler: isOffline ? 'src/main.hello' : 'main.hello',
    },
  },
};

module.exports = serverlessConfiguration;

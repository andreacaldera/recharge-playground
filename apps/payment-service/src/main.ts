import { APIGatewayProxyHandler } from 'aws-lambda';
import { add } from 'lodash';

export const hello: APIGatewayProxyHandler = async (event) => {
  console.log(event);
  const { numbers } = event as unknown as { numbers: number[] };
  numbers.reduce((item, acc) => acc + item, 0);
  return {
    statusCode: 200,
    body: JSON.stringify({
      add: numbers.reduce((item, acc) => acc + item, add(6, 4)),
    }),
  };
};

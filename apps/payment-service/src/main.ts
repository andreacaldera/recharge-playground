import { APIGatewayProxyHandler } from 'aws-lambda';

export const hello: APIGatewayProxyHandler = async (event) => {
  console.log(event);
  const numbers: number[] = (event as any).numbers;
  numbers.reduce((item, acc) => acc + item, 0);
  return {
    statusCode: 200,
    body: JSON.stringify({
      add: numbers.reduce((item, acc) => acc + item, 0),
    }),
  };
};

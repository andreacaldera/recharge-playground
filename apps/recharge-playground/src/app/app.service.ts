import { Injectable } from '@nestjs/common';
import { LibraryOne, libraryOne } from '@recharge-playground/library-one';
import { Lambda } from 'aws-sdk';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const isOffline = process.env.IS_OFFLINE === 'true';
    const params = {
      FunctionName: `payment-service-${isOffline ? 'local' : 'stage'}-hello`,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ numbers: [1, 2, 3] }),
    };
    const response = await new Lambda(
      isOffline
        ? { endpoint: 'http://localhost:3002', region: 'eu-west-2' }
        : {}
    )
      .invoke(params)
      .promise();
    if (response.StatusCode !== 200 || !response.Payload) {
      throw new Error('Failed to get response from lambda function');
    }

    const body = JSON.parse(JSON.parse(response.Payload as string).body);
    console.log(111, body);
    const { add } = body;

    const test: LibraryOne = libraryOne();
    return { message: `Hello API: ${test.first}; result from lambda: ${add}` };
  }
}

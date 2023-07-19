import { Injectable } from '@nestjs/common';
import { LibraryOne, libraryOne } from '@recharge-playground/library-one';

@Injectable()
export class AppService {
  getData(): { message: string } {
    const test: LibraryOne = libraryOne();
    return { message: `Hello API: ${test.first}` };
  }
}

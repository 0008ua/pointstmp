import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  generateTelegramSecurityCode(): string {
    let code = String(Math.floor(Math.random() * 1000000));
    code = code.length === 5 ? 0 + code : code;
    return code;
  }
}

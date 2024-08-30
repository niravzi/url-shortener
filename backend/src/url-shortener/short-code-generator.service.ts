import { Injectable } from '@nestjs/common';

const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SEQUENCE_START = BigInt(100000000000);

@Injectable()
export class ShortCodeGeneratorService {
  constructor() {}

  generateShortCode(codesCount: bigint) {
    const base = BigInt(ALPHABET.length);
    let base64Code = '';
    let radix: bigint;
    let sequenceNumber = SEQUENCE_START + codesCount + BigInt(1);

    while (sequenceNumber) {
      radix = sequenceNumber % BigInt(base);
      sequenceNumber -= radix;
      sequenceNumber /= base;
      base64Code = ALPHABET.charAt(Number(radix)) + base64Code;
    }

    return base64Code;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ShortCodeGeneratorService } from './short-code-generator.service';

describe('ShortCodeGeneratorService', () => {
  let shortCodeGeneratorService: ShortCodeGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortCodeGeneratorService],
    }).compile();

    shortCodeGeneratorService = module.get<ShortCodeGeneratorService>(
      ShortCodeGeneratorService,
    );
  });

  describe('generateShortCode', () => {
    it('should generate 7-char long code base on given number', () => {
      const code = shortCodeGeneratorService.generateShortCode(BigInt(1));

      expect(code).toBe('1L9zO9Q');
      expect(code.length).toBe(7);
    });

    it('should generate different codes for different numbers', () => {
      const code1 = shortCodeGeneratorService.generateShortCode(BigInt(1));
      const code2 = shortCodeGeneratorService.generateShortCode(BigInt(2));

      expect(code1).not.toBe(code2);
    });

    it('should only accept positive numbers', () => {
      const action = () => {
        shortCodeGeneratorService.generateShortCode(BigInt(-1));
      };

      expect(action).toThrow();
    });
  });
});

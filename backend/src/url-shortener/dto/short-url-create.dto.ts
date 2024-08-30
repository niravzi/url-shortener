import { IsUrl } from 'class-validator';

export class ShortUrlCreateDto {
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
  })
  url: string;
}

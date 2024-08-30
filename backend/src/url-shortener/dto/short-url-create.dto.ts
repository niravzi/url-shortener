import { IsUrl } from 'class-validator';

export class ShortUrlCreateDto {
  @IsUrl()
  url: string;
}

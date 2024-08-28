import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { URLShortenerService } from './url-shortener.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class URLShortenerController {
  constructor(private readonly urlShortenerService: URLShortenerService) {}

  @Post()
  createShortUrl(@Body() createUrlDto: CreateUrlDto): string {
    return this.urlShortenerService.createShortUrl(createUrlDto.url);
  }

  @Get(':shortUrlId')
  redirectToFullUrl(@Param() shortUrlId: string) {
    return this.urlShortenerService.getOriginalUrl(shortUrlId);
  }
}

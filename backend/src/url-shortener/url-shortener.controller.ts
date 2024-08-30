import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { URLShortenerService } from './url-shortener.service';
import { ShortUrlCreateDto } from './dto/short-url-create.dto';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { URLShortenerEvent } from './events';
import { URLVisitEvent } from './events/url-visit.event';
import { ShortUrlResponseDto } from './dto/short-url-response.dto';

@Controller()
export class URLShortenerController {
  constructor(
    private readonly urlShortenerService: URLShortenerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  createShortUrl(
    @Body() shortUrlCreateDto: ShortUrlCreateDto,
  ): Promise<ShortUrlResponseDto> {
    return this.urlShortenerService.createShortUrl(shortUrlCreateDto.url);
  }

  @Get(':shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() response: Response,
  ) {
    const originalUrl =
      await this.urlShortenerService.getOriginalUrl(shortCode);

    if (!originalUrl) {
      throw new NotFoundException();
    }

    this.eventEmitter.emit(
      URLShortenerEvent.URLVisited,
      new URLVisitEvent(shortCode),
    );

    response.redirect(originalUrl);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mainConfig } from '../src/main.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    mainConfig(app);

    await app.init();
  });

  it('/ (GET) shoud return 404 if accessing missing short code', () => {
    return request(app.getHttpServer()).get('/random').expect(404);
  });

  it('/ (GET) shoud return 404 if short code is not provided', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/ (GET) shoud return 302 Redirect to original URL for existing short code', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({ url: 'https://google.com' });

    const shortCode = response.body.shortCode;

    expect(shortCode).toBeDefined();

    return request(app.getHttpServer())
      .get(`/${shortCode}`)
      .expect(302)
      .expect('Location', 'https://google.com');
  });

  it('/ (POST) should return validation error when body is empty', () => {
    return request(app.getHttpServer()).post('/').send('').expect(400);
  });

  it("/ (POST) should return validation error when body is missing 'url' parameter", () => {
    return request(app.getHttpServer()).post('/').send({}).expect(400);
  });

  it("/ (POST) should return validation error when 'url' parameter is empty", () => {
    return request(app.getHttpServer()).post('/').send({ url: '' }).expect(400);
  });

  it("/ (POST) should return validation error when 'url' is not valid URL", () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ url: 'random-string' })
      .expect(400);
  });

  it('/ (POST) should return 201 Created when provided valid URL', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ url: 'https://stackoverflow.com' })
      .expect(201);
  });

  it('/ (POST) should return short code when provided valid URL', async () => {
    const response = await request(app.getHttpServer())
      .post('/')
      .send({ url: 'https://stackoverflow.com' });

    expect(response.body.shortCode).toBeDefined();
    expect(response.body.shortCode).toHaveLength(7);
  });
});

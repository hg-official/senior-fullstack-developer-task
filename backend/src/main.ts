import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const frontedURL = process.env.FRONTEND_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [frontedURL],
  });
  console.log('CORS allowed origin:', frontedURL);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

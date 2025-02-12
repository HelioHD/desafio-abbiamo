import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '30mb' }))
  await app.listen(3000);

}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true ,// Only rquired values are received and updated/Created
    transform:true, // ENable transforming of the data being returned
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Expense App Endpoints')
  .setDescription('This is a simple application buit to show how to use nest js to build awesome backend with APIs')
  .setVersion('1.0')
  .addTag('expense-app')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

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

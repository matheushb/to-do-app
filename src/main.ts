import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup_swagger } from './common/config/setup_swagger';
import { ValidationPipe } from '@nestjs/common';
import { validationPipesConfig } from './common/config/validation_pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8001;
  setup_swagger(app);
  app.useGlobalPipes(new ValidationPipe(validationPipesConfig));
  await app.listen(port);
}
bootstrap();

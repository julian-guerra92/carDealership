import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  //Definición de Pipe global en la aplicación para el uso de las validaciones o DTOS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //limpia la información enviada en la petición
      forbidNonWhitelisted: true //Filtra la petición y genera error en caso de no se conforme
    })
  )

  await app.listen(3000);
}
main();

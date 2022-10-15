import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  //For high-traffic websites in production compression should be on reverse proxy and not app server, see https://docs.nestjs.com/techniques/compression
  await app.register(helmet);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.listen(3000);
}
bootstrap();

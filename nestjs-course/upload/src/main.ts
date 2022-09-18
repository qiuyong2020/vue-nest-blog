import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', { prefix: '/uploads' }) //上传文件后，根据url访问静态资源

  await app.listen(3000)
}
bootstrap()

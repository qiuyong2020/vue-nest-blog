import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import Validate from './common/validate' //管道验证
import { TransformInterceptor } from './transform.interceptor' //响应拦截

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Global registration of your custom form-validation. (Pipe)
  app.useGlobalPipes(new Validate())

  //Global registration of your custom response-interceptor. (Interceptor)
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(3000)
}
bootstrap()
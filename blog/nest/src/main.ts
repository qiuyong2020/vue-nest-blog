import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/validate' //管道验证
import { TransformInterceptor } from './transform.interceptor' //响应拦截

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //Global registration of your custom form-validation. (Pipe)
  app.useGlobalPipes(new Validate())

  //Global registration of your custom response-interceptor. (Interceptor)
  app.useGlobalInterceptors(new TransformInterceptor())

  //客户端与服务端在同一域名下访问，为服务端接口设置api请求前缀，进行前后端分离
  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()

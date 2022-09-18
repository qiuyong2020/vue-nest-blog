import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import Validate from './validate'
import { ValidateExceptionFilter } from './validate-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //使用系统验证管道
  app.useGlobalPipes(new Validate())

  //使用过滤器处理验证异常
  app.useGlobalFilters(new ValidateExceptionFilter())

  await app.listen(3000)
}
bootstrap()

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //注册为全局模块
      load: [...config], //加载配置文件
    }),
  ], //安装ConfigModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

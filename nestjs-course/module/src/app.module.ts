import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { ArticleModule } from './article/article.module'
import path from 'path'

const configPath = path.resolve(__dirname, './configure') //配置项管理
@Module({
  imports: [ConfigModule.register({ path: configPath }), ArticleModule], //动态模块注册
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

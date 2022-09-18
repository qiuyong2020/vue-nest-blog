import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'

@Module({
  // config 为全局模块，无需导入即可使用
  // imports: [ConfigModule], //导入 config 模块，在 article 模块中使用
  controllers: [ArticleController],
})
export class ArticleModule {}

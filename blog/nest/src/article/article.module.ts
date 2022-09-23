import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { ConfigService } from '@nestjs/config'

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ConfigService],
})
export class ArticleModule {}

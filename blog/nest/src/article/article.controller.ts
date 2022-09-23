import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

//博客文章的 增/删/改/查 接口
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post() //添加单条文章
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get() //查询所有文章
  findAll() {
    return this.articleService.findAll()
  }

  @Get(':id') //查询单条文章
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @Patch(':id') //修改单条文章
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id') //删除单条文章
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}

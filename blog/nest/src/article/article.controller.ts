import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entities'

//博客文章的 增/删/改/查 接口
@Controller('article')
// @UseInterceptors(ClassSerializerInterceptor) //响应序列化
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post() //添加单条文章
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get() //查询所有文章（接收前端传来的query参数，分页页码和栏目ID）
  // @SerializeOptions({ strategy: 'excludeAll' }) //所有响应字段都不返回
  async findAll(@Query() args = {}) {
    return await this.articleService.findAll(args)
  }

  @Get(':id') //查询单条文章
  async findOne(@Param('id') id: string) {
    const response = await this.articleService.findOne(+id)
    return new Article(response)
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

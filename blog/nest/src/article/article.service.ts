import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

//博客文章：增/删/改/查
@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  create(createArticleDto: CreateArticleDto) {
    //添加单条文章
    return this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        categoryId: +createArticleDto.categoryId, //文章所属栏目的id，字符串转数值
      },
    })
  }

  async findAll(page = 1) {
    //每页文章数
    const row = this.config.get('ARTICLE_PAGE_ROW')
    // console.log(row)

    //获取第page页的row条文章
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * row, //查询的起始位置，即从第几条开始
      take: +row, //查询多少条，字符串转数值
    })
    console.log(`当前页有${articles.length}篇文章`)

    // return articles
    const total = await this.prisma.article.count() //文章总数
    //向前端返回博客文章的分页信息
    return {
      meta: {
        current_path: page, //当前页数
        page_row: row, //当前页的文章条数
        total, //文章总条数
        total_page: Math.ceil(total / row), //总页数
      },
      data: articles, //当前页的文章总条数
    } //返回给前端的JSON文件
  }

  findOne(id: number) {
    //根据路径参数id，查询单条文章
    return this.prisma.article.findFirst({
      where: { id },
    })
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    //根据路径参数id，修改并更新单条文章
    return this.prisma.article.update({
      where: { id }, //被修改文章的ID
      data: { ...updateArticleDto, categoryId: +updateArticleDto.categoryId }, //修改后的文章及所在栏目的id
    })
  }

  remove(id: number) {
    //根据路径参数id，删除单条文章
    return this.prisma.article.delete({
      where: { id },
    })
  }
}

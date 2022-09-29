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

  async findAll(args: Record<string, any>) {
    //每页文章数
    const row = this.config.get('ARTICLE_PAGE_ROW')
    // console.log(row)

    const page = args.page ? +args.page : 1 //分页页码

    const articles = await this.prisma.article.findMany({
      include: {
        category: true,
      }, //关联文章栏目
      where: {
        category: args.category ? { id: +args.category } : {},
      }, //栏目ID
      skip: (page - 1) * row, //查询的起始位置，即从第几条开始
      take: +row, //查询的条数，字符串转数值
    }) //获取第page页的row条文章
    console.log(`当前页有${articles.length}篇文章`)

    const total = await this.prisma.article.count({
      where: {
        category: args.category ? { id: +args.category } : {},
      }, //栏目ID
    }) //统计指定栏目下的文章数量

    //向前端返回博客文章的分页信息
    return {
      meta: {
        current_page: page, //当前页数
        page_row: +row, //当前页的文章条数
        total, //文章总条数
        total_page: Math.ceil(total / row), //总页数
      },
      data: articles, //当前页的文章总条数
    } //JSON文件
  }

  findOne(id: number) {
    //根据路径参数id，查询单条文章
    return this.prisma.article.findFirst({
      where: { id },
    })
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    //根据路径参数id，修改并更新单条文章
    return await this.prisma.article.update({
      where: { id }, //被修改文章的ID
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
      }, //修改后的文章及所在栏目的id
    })
  }

  remove(id: number) {
    //根据路径参数id，删除单条文章
    return this.prisma.article.delete({
      where: { id },
    })
  }
}

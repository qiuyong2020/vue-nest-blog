import { Body, Controller, DefaultValuePipe, Get, Param, Post } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { AppService } from './app.service'
import CreateArticleDto from './dto/create.article.dto'
import { TransformerPipe } from './transformer.pipe'

@Controller()
export class AppController {
  prisma: PrismaClient
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient()
  }

  @Get() //请求query参数
  getHello(@Param('id', new DefaultValuePipe(1), TransformerPipe) id: number) {
    // return this.appService.getHello()
    // return typeof id

    //通过 prisma 查询数据库
    return this.prisma.article.findUnique({
      where: {
        id: id, //报错：地址栏中输入的id值为String类型，而这里要求id为Number类型，查询失败
        // id: +id, //query参数由字符串转整型
      },
    })
  }

  @Post('store') //store路由
  add(@Body(TransformerPipe) dto: CreateArticleDto) {
    //写入数据库
    const article = this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
      },
    })
    console.log(article)
  }
}

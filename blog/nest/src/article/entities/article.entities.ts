import { article } from '@prisma/client'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'
/**
 * 将响应数据经序列化后，返回给前端
 */
export class Article {
  // @Exclude() //响应字段不返回
  // title: string

  @Transform(({ value }) => dayjs(value).format('YYYY/MM/DD HH:mm:ss')) //格式化日期
  createdAt: string
  @Transform(({ value }) => dayjs(value).format('YYYY/MM/DD HH:mm:ss')) //格式化日期
  updatedAt: string

  constructor(options: Partial<article>) {
    Object.assign(this, options)
  }
}

import { PrismaClient } from '@prisma/client'
import _ from 'lodash'
import { Random } from 'mockjs'
import { create } from '../helper'

// 填充 article 表
export async function article() {
  create(30, async (prisma: PrismaClient) => {
    await prisma.article.create({
      data: {
        title: Random.ctitle(),
        content: Random.cparagraph(10, 50),
        thumb: Random.image(),
        categoryId: _.random(1, 10), //生成1~10的随机数
      },
    })
  })
}

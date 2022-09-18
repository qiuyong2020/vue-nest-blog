import { PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import { create } from '../helper'

// 填充 category 表
export async function category() {
  create(30, async (prisma: PrismaClient) => {
    await prisma.category.create({
      data: {
        title: Random.ctitle(),
      },
    })
  })
}

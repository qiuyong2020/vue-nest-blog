import { PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'
import { create } from '../helper'

// 填充 user 表
export async function user() {
  create(20, async (prisma: PrismaClient) => {
    await prisma.user.create({
      data: {
        age: 18,
        email: Random.email(),
        password: 'admin888',
        github: Random.url(),
        avatar: Random.image(),
      },
    })
  })
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * 工具函数
 * @param count Number 创建数据条数
 * @param callback Function 回调函数
 */
export async function create(count = 1, callback: (prisma: PrismaClient) => void) {
  for (let i = 0; i < count; i++) {
    callback(prisma)
  }
}

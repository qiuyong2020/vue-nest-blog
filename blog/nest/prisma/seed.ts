import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'

const prisma = new PrismaClient()
async function run() {
  //填充用户表
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('admin123'), //对密码进行”哈希加密“
    },
  })

  //填充博客文章表
  for (let i = 0; i < 10; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30), //mokjs随机生成文章标题
        content: Random.cparagraph(30, 50), //mokjs随机生成文章内容
      },
    })
  }
}

run()

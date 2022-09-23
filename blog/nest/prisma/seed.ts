import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import _ from 'lodash'
import { Random } from 'mockjs'

const prisma = new PrismaClient()
async function run() {
  //填充用户
  await prisma.user.create({
    data: {
      name: 'admin',
      password: await hash('admin123'), //对密码进行”哈希加密“
      role: 'admin',
    },
  })

  //填充文章栏目
  for (let i = 0; i <= 5; i++) {
    await prisma.category.create({
      data: {
        title: Random.ctitle(3, 6), //mokjs随机生成栏目标题
      },
    })
  }

  //填充博客文章
  for (let i = 0; i < 30; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 30), //mokjs随机生成文章标题
        content: Random.cparagraph(30, 50), //mokjs随机生成文章内容
        categoryId: _.random(1, 5), //lodash获取无重复的栏目ID
      },
    })
  }
}

run()

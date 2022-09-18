import { article } from './seeds/article'
import { category } from './seeds/category'
import { user } from './seeds/user'

async function run() {
  user() //填充user表
  await category() //填充category表
  article() //填充article表
}
run()

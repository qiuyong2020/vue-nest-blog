import { getAllCategory } from '@/apis/category'

/**
 * 获取文章栏目列表
 */
export default () => {
  //文章栏目数组
  const categories = ref<CategoryModel[]>()

  const all = async () => {
    categories.value = await getAllCategory()
  }

  return { all, categories }
}

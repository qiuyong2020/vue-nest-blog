import { addArticle, getArticle, getArticleList, updateArticle } from '@/apis/article'

/**
 * 发送请求，获取博客文章
 */
export default () => {
  //分页文章列表
  const pageResult = ref<ResponsePageResult<ArticleModel>>()
  let categoryId: any = null
  const article = ref<ArticleModel>()

  //获取指定栏目下的分页文章
  const all = async (page = 1, cid?: any) => {
    if (cid) categoryId = cid
    pageResult.value = await getArticleList(page, categoryId)
  }

  //根据文章ID检索单个文章
  const find = async (id: number) => {
    article.value = await getArticle(id)
  }

  //添加单个文章
  const add = async (data: Record<string, any>) => {
    return addArticle(data)
  }

  //修改文章
  const update = async (data: ArticleModel) => {
    // console.log(data)
    return updateArticle(data)
  }

  return { all, pageResult, article, find, add, update }
}

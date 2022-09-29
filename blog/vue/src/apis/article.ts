import { http } from '@/plugins/axios'

/**
 * 获取指定栏目下的分页文章
 * @param {number} page 分页页码
 * @param {string} cid 文章栏目ID
 * @returns {ArticleModel[]} pageResult 分页文章列表
 */
export function getArticleList(page = 1, cid?: any) {
  //单个文章的请求路径
  const url = `article?page=${page}&` + (cid ? `category=${cid}` : '')
  // console.log('文章当前页：' ,url)
  return http.request<ArticleModel, ResponsePageResult<ArticleModel>>({
    url,
  })
}

/**
 * 
 * @param {number} id 文章ID
 * @returns {ArticleModel} response 博客文章
 */
export async function getArticle(id: number) {
  const r = await http.request<ArticleModel>({
    url: `article/${id}`,
  })
  return r.data
}

/**
 * 
 * @param {ArticleModel} data 新增博客
 * @returns post请求
 */
export async function addArticle(data: any) {
  return http.request({
    url: 'article',
    method: 'POST',
    data,
  })
}

/**
 * 
 * @param {ArticleModel} data 修改后的博客
 * @returns post请求
 */
export async function updateArticle(data: any) {
  // console.log(data)
  return http.request({
    url: `article/${data.id}`,
    method: 'PATCH',
    data,
  })
}

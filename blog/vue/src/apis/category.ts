import { http } from '@/plugins/axios'

export function getAllCategory() {
  return http
    .request<CategoryModel[]>({
      url: 'category',
    })
    .then((r) => {
      // console.log('文章栏目：', r.data)
      return r.data
    })
}

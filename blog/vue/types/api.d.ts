//请求响应结构（响应数据没有分页时）
interface ResponseResult<T> {
  data: T
}

//分页请求响应结构（响应数据有分页时）
interface ResponsePageResult<T> {
  //文章列表
  data: T[]
  //元信息
  meta: {
    current_page: number
    page_row: number
    total: number
    total_page: number
  }
}

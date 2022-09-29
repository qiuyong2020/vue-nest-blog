//用户模型
type UserModel = {
  id?: string | number
  mobile?: string | number
  sex?: number
  email?: string
  nickname?: any
  home?: any
  weibo?: any
  wechat?: any
  github?: any
  qq?: any
  avatar?: string
  created_at?: string
  updated_at?: string
}

//文章栏目模型
interface CategoryModel {
  id: number
  title: string
}

//文章模型
interface ArticleModel {
  id: number
  title: string
  content: string
  categoryId: number
  createdAt: string
  updatedAt: string
  //关联其所属栏目
  category: {
    id: number
    title: string
  }
}

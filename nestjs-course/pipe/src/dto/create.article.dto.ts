import { IsNotEmpty, Length } from 'class-validator' //验证规则的包

/**
 * 用于创建博客文章的数据传输对象
 */
export default class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' }) //属性装饰器，非空检验
  @Length(10, 100, { message: '标题不能少于10个字' }) //字符长度校验
  title: string

  @IsNotEmpty({ message: '内容不能为空' })
  content: string
}

//校验规则对象
// article: {
//   title: {
//     rule: [{rule: 'notEmpty', {message: '标题不能为空'}}]
//   }
// }

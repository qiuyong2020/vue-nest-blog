import { IsNotEmpty } from 'class-validator'

/**
 * 博客文章的表单校验规则
 */
export class CreateArticleDto {
  @IsNotEmpty({ message: 'Title cannot be empty!' })
  title: string

  @IsNotEmpty({ message: 'Content cannot be empty!' })
  content: string

  @IsNotEmpty({ message: 'please input category!' })
  categoryId: number
}

import { IsNotEmpty } from 'class-validator'

/**
 * 文章栏目的表单校验规则
 */
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'The category name cannot be empty!' })
  title: string
}

import { IsNotEmpty } from 'class-validator'
import { IsExistRule } from '@/common/rules/is-exist.rule'

/**
 * 登录表单的校验规则对象
 */
export default class LoginDto {
  @IsNotEmpty({ message: 'The user name is required!' })
  @IsExistRule('user', { message: 'This account does not exist!' })
  name: string

  @IsNotEmpty({ message: 'The password is required!' })
  password: string
}

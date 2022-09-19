import { IsNotEmpty } from 'class-validator'
import { IsConfirmedRule } from '@/common/rules/is-confirm.rule'
import { IsNotExistRule } from '@/common/rules/is-not-exist.rule'

/**
 * 注册表单的校验规则对象
 */
export default class RegisterDto {
  @IsNotEmpty({ message: 'The username cannot be empty!' })
  @IsNotExistRule('user', { message: 'This username has already been used!' })
  name: string

  @IsNotEmpty({ message: 'The password cannot be empty!' })
  @IsConfirmedRule({ message: 'Please enter the correct password again!' })
  password: string

  @IsNotEmpty({ message: 'The confirm password cannot be empty!' })
  password_confirmed: string
}

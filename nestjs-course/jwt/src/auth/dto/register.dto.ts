import { IsNotEmpty } from 'class-validator'

export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空！' })
  name: string

  @IsNotEmpty({ message: '密码不能为空！' })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空！' })
  // 验证两次密码是否一致
  password_confirmed: string
}

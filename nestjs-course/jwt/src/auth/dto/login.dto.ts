import { IsNotEmpty } from 'class-validator'

export default class LoginDto {
  //账号
  @IsNotEmpty({ message: '账号不能为空！' })
  name: string
  //密码
  @IsNotEmpty({ message: '密码不能为空！' })
  password: string
}

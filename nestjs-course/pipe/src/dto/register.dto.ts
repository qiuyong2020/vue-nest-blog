import { IsNotEmpty, Validate } from 'class-validator'
import { IsNotExistRule } from 'src/rules/is-not-exist.rule'
import { RegisterConfirmed } from 'src/rules/register-confirmed.rule'

/**
 * 注册用户的数据传输对象
 */
export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' }) //用户名非空检验
  @IsNotExistRule('user', { message: '用户名已存在' }) //自定义装饰器，验证用户名的唯一性
  name: string

  @IsNotEmpty({ message: '密码不能为空' }) //用户密码非空检验
  @Validate(RegisterConfirmed, { message: '确认密码输入错误！' }) //注入自定义验证规则进行密码校验
  password: string

  // @IsNotEmpty() //确认密码
  // password_confirmed: string
}

import { Body, Controller, Get, Post } from '@nestjs/common'
import { user as UseType } from '@prisma/client'
import { AuthService } from './auth.service'
import { Auth } from './decorator/auth.decorator'
import { User } from './decorator/user.decorator'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register') //注册接口
  register(@Body() body: RegisterDto) {
    return this.auth.register(body) //注册表单校验格式后，写入数据库
  }

  @Post('login') //登录接口
  login(@Body() body: LoginDto) {
    // return body
    return this.auth.login(body) //登录表单中的账号密码与数据库进行校对
  }

  @Get('all') //所有用户
  // @UseGuards(AuthGuard('jwt')) //使用jwt策略进行身份认证
  @Auth() //装饰器聚合
  // all(@Req() req: Request) {
  //   return req.user //jwt验证用户身份通过后，获取用户数据
  //   // return this.auth.findAll()
  // }
  all(@User() user: UseType) {
    return user //jwt验证用户身份通过后，返回当前用户
  }
}

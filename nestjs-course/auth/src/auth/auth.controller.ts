import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import LoginDto from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  // 注册auth服务
  constructor(private readonly auth: AuthService) {}

  @Post('register') //用户注册 register 接口
  register(@Body() dto: RegisterDto) {
    // return dto

    // 调用注册服务
    return this.auth.register(dto)
  }

  @Post('login') //用户登录 login 接口
  login(@Body() dto: LoginDto) {
    // return dto

    // 调用登录服务
    return this.auth.login(dto)
  }
}

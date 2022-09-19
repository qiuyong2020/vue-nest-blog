import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  // Request interface for new user's registration. (The blog website supports only single users right now)
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.auth.register(body)
  }

  // Request interface for old user's login.
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.auth.login(body)
  }
}

import { Body, Controller, Post } from '@nestjs/common'
import RegisterDto from 'src/dto/register.dto'

@Controller('auth')
export class AuthController {
  prisma: any
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return dto
  }
}

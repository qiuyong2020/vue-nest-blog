import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from './../prisma/prisma.service'

/**
 * 使用JWT策略进行身份认证
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交给服务器的“Bearer Token header”数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //拿到token加密的“secret”密钥
      secretOrKey: configService.get('TOKEN_SECRET'),
    })
  }

  // 身份认证通过后，根据解析token签名后的id，向数据库提取用户资料
  async validate({ sub: id }) {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }
}

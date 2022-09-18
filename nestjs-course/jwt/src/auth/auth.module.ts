import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt' //JWT模块
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy' //JWT身份认证策略

@Module({
  imports: [
    // 配置JWT模块
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), //通过配置项获取token密钥
          signOptions: { expiresIn: '1h' }, //设置token的过期时间
        }
      },
    }),
  ],
  providers: [AuthService, JwtStrategy], //注册服务提供者
  controllers: [AuthController],
})
export class AuthModule {}

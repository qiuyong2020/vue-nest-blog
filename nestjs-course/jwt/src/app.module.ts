import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config' //配置项模块
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, //注册为全局模块
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

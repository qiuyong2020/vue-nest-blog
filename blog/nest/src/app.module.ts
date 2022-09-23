import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { CategoryModule } from './category/category.module'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ArticleModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true, //注册为全局模块
    }),
  ],
  providers: [AuthService, PrismaService, JwtService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'
import { PrismaModule } from './prisma/prisma.module'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [AuthService, PrismaService, JwtService],
})
export class AppModule {}

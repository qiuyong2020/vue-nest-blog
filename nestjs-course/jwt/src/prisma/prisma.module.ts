import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaController } from './prisma.controller'

@Global() //注册为全局模块
@Module({
  providers: [PrismaService],
  controllers: [PrismaController],
  exports: [PrismaService], //将prisma提供的服务暴露出去
})
export class PrismaModule {}

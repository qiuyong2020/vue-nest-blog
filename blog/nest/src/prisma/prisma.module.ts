import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Global() //Register as a global module
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //Expose the Prisma service to the other modules.
})
export class PrismaModule {}

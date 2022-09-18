import { Module } from '@nestjs/common'
import { QyService } from './qy.service'
import { QyController } from './qy.controller'
import { TestModule } from 'src/test/test.module'

@Module({
  imports: [TestModule], //导入其他模块
  providers: [QyService],
  controllers: [QyController],
})
export class QyModule {}

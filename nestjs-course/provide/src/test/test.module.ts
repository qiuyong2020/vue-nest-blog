import { Module } from '@nestjs/common'
import { TestService } from './test.service'

@Module({
  providers: [TestService, { provide: 'test', useValue: '测试的 test 服务' }],
  exports: [TestService, 'test'], //将该模块作为导出项，外部模块可访问
})
export class TestModule {}

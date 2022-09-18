import { Controller, Get, Inject } from '@nestjs/common'
import { TestService } from 'src/test/test.service'

@Controller('qy')
export class QyController {
  constructor(
    private readonly test: TestService,
    //注册test模块
    @Inject('test')
    private testValue: any,
  ) {}
  @Get()
  show() {
    return this.test.get() + this.testValue
    // return 'qy module show method.'
  }
}

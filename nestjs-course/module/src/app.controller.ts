import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigService } from './config/config.service'

@Controller()
export class AppController {
  constructor(
    private readonly config: ConfigService, // @Inject('qy') // private qy: string,
  ) {}

  @Get()
  getHello(): any {
    // return this.qy
    return this.config.get('app.name')
    // return this.appService.getHello()
  }
}

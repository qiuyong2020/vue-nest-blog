/** 控制器（依赖管理） */
import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'
import { DbService } from './db.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DbService')
    private dbService: any,
  ) {}
  // @Inject()依赖注册：向app.module.ts中根据provide值寻找服务提供者
  // constructor(
  //   @Inject('configService')
  //   private config,
  // ) {}

  @Get()
  getHello(): string {
    // return this.appService.get()
    // return this.config.get()
    // return this.dbService.connect()
    return this.dbService
  }
  // findOne() {
  //   return this.appService.findOne()
  // }
}

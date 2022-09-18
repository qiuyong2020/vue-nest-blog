import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import { AppService } from './app.service'
import databaseConfig from './config/database.config'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
    @Inject(databaseConfig.KEY) //通过key值，注册提供者并读取到值
    private database: ConfigType<typeof databaseConfig>, //通过ConfigType提取类型，获得代码提示
  ) {}

  @Get()
  getHello(): any {
    //读取当前环境变量
    // console.log(this.config.get('app.isDev'))

    // return this.config.get('database')
    // return this.config.get('upload')
    // console.log(process.env.NODE_ENV)
    // return process.env.APP_NAME
    // return this.config.get('ALIYUN_SECRET')
    // return this.appService.getHello();

    // return this.database.host
    // // 泛型提取工具
    // type getType<T extends () => any> = T extends () => infer U ? U : T
    // // 声明类型
    // type databaseType = getType<typeof databaseConfig>
    // return (this.database as databaseType).password
    return this.database.password
  }
}

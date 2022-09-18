/** 服务管理（业务逻辑） */
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  // 调用其他服务,要在constructor中声明
  // constructor(@Inject('config') private readonly config: any) {}
  get(): string {
    return 'AppService get method!'
  }
  // findOne() {
  //   return 'app findOne method ' + this.config.name
  // }
}

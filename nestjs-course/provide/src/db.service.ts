import { Injectable } from '@nestjs/common'

@Injectable()
export class DbService {
  /**
   * 连接数据库
   */
  public connect() {
    return `<h1>连接数据库</h1>`
  }
}

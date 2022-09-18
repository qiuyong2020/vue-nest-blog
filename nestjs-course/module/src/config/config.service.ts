import { Inject, Injectable, Optional } from '@nestjs/common'
import { readdirSync } from 'fs'
import path from 'path'

@Injectable()
export class ConfigService {
  // config = {} as any //模块配置项
  // constructor() {
  //   const config = { path: path.resolve(__dirname, '../configure') }
  //   // console.log(config)
  //   /**
  //    ** 读取模块配置项
  //    */
  //   const files = readdirSync(config.path)
  //   // console.log(files)
  //   files.map(async (file) => {
  //     //过滤.js文件
  //     if (file.slice(-2) === 'js') {
  //       // console.log(file)
  //       // 动态导入模块
  //       const module = await import(path.resolve(config.path, file))
  //       // console.log(module.default())
  //       this.config = { ...this.config, ...module.default() }
  //     }
  //     // console.log(this.config)
  //   })
  // }

  /**
   ** 动态模块注册
   */
  constructor(
    @Inject('CONFIG_OPTIONS')
    options: { path: string }, //依赖注入
    @Optional()
    private config = {}, //默认参数
  ) {
    // const options = { path: path.resolve(__dirname, '../configure') }
    readdirSync(options.path).map(async (file) => {
      if (file.slice(-2) === 'js') {
        const module = await import(path.resolve(options.path, file))
        this.config = { ...this.config, ...module.default() }
      }
    })
  }

  /**
   ** 点语法读取配置项
   * @param path(string)
   * @returns config(string)
   */
  get(path: string) {
    // app.name => this.config == {app: {name: 'xxx'}} => this.config['app']['name']
    // console.log(path.split('.'))
    // console.log(this.config)
    return path.split('.').reduce((config, name) => {
      return config[name]
    }, this.config)

    // return this.config
  }
}

import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

@Global() //将 config 配置项模块注册为全局模块，其他模块无需导入即可使用它
@Module({
  providers: [
    ConfigService, //将整个模块暴露出去
    // {
    //   provide: 'config',
    //   useValue: '普通值',
    // }, //只暴露模块中的某些值
  ],
  exports: [ConfigService], //将模块接口暴露出去，才能被其他模块注册
})
export class ConfigModule {
  // 注册动态模块的静态方法 => 动态模块可以接收参数，根据不同参数注册对应模块
  static register(options: { path: string }): DynamicModule {
    console.log(options)
    return {
      // global: true, //注册为全局模块
      module: ConfigModule,
      providers: [
        // {
        //   provide: 'qy',
        //   useValue: '云雾同风',
        // },
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      // exports: ['qy'],
    }
  }
}

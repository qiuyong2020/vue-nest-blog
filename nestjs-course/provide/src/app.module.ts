/** 路由模块（根模块） */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbService } from './db.service'
import { QyModule } from './qy/qy.module'
import { TestModule } from './test/test.module'

// 加载当前环境变量
// dotenv.config({ path: path.join(__dirname, '../.env') })
// console.log(process.env.NODE_ENV)

// 根据环境变量，动态注册不同模块的服务
// const configService = {
//   provide: 'configService',
//   useClass: process.env.NODE_ENV === 'development' ? DevService : AppService,
// }

// Decorator装饰器（试验功能，在tsconfig.json中开启选项进行启用）
@Module({
  imports: [QyModule, TestModule], //模块注册
  controllers: [AppController], //模块控制器
  providers: [
    AppService,
    // ConfigService,
    DbService,
    {
      provide: 'DbService',
      // inject: ['ConfigService'],
      // 当前服务依赖其他服务时，需定义工厂函数
      useFactory: async () => {
        //提供异步服务
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('远行无涯')
          }, 3000)
        })
        // return new DbService()
      },
    },
    // configService,
    // DevService,
  ], //服务提供者
})
export class AppModule {}

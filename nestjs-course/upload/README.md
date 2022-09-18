# `upload` 文件上传

## Description

- 项目初始化
- 定义`upload`模块
- 在控制器中体验**文件上传**
- 拦截器的定义与注册
- 优化图片/文档等不同类型的上传处理逻辑
- 整合封装

## 项目初始化

创建项目文件夹：

```bash
# 创建nest.js项目
$ nest new jwt

# 生产依赖包
$ pnpm add multer
# 开发依赖包
$ pnpm add -D @types/multer
```

## 定义`upload`模块

创建模块：
`src/upload/upload.module.ts`
`src/upload/upload.service.ts`
`src/upload/upload.controller.ts`

```cmd
$ nest g mo upload --no-spec
$ nest g s upload --no-spec
$ nest g co upload --no-spec
```

模块定义：

```ts
import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { diskStorage } from 'multer'
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            //文件储存位置
            destination: 'uploads',
            //文件名定制
            filename: (req, file, callback) => {
              const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
              callback(null, path)
            },
          }),
        }
      },
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
```

## `Interceptor`拦截器

```ts
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'

/**
 * 请求拦截器 => 在请求前/后，对数据进行拦截处理
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('拦截器前')
    const request = context.switchToHttp().getRequest() as Request
    const startTime = Date.now()

    //对所有响应数据以data属性进行包裹
    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now()
        new Logger().log(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`)
        return {
          data,
        }
      })
    )
  }
}
```

## 体验文件上传

上传处理：

```ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { TransformInterceptor } from '../TransformInterceptor'

@Controller('upload')
@UseInterceptors(new TransformInterceptor()) //请求拦截器
export class UploadController {
  // 图片上传的请求接口
  @Post('image')
  @UseInterceptors(FileInterceptor('file')) //拦截image接口, 拿到post请求中携带的文件
  image(@UploadedFile() file: Express.Multer.File) {
    return file.originalname //拦截后返回响应数据
  }
}
```

向 http://localhost:3000/upload/image 发送一个携带`xxx.jpeg`图片的`POST`请求，得到响应数据：

```json
{
  "data": "xxx.jpeg"
}
```

上传的类型校验（只允许上传图片文件）：

```ts
@Post('image')
  @UseInterceptors(
      FileInterceptor('file', {
        limits: { fileSize: Math.pow(1024, 2) * 2 }, //限制文件大小
        fileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
          // console.log(file.mimetype) //文件的mime类型（如“image/jpeg”）
          if (!file.mimetype.includes('image')) {
            //上传的文件不是图片
            callback(new MethodNotAllowedException('文件格式错误！'), true) //取消上传
          } else {
            callback(null, true) //允许上传
          }
        }, //筛选文件格式
      }), //拦截image接口
    )
```

## 使用装饰器优化代码

拦截上传文件的`@Upload`装饰器：

```ts
import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

/**
 * 用于拦截上传文件的装饰器 => 根据不同的文件格式，自定义拦截选项
 * @params fileType string 文件格式，默认为'file'
 * @params options 拦截选项
 */
export function Upload(fileType = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(fileType, options)))
}

/**
 * 封装拦截选项
 * @param fileType string 允许上传的文件类型
 * @returns options MulterOptions 文件选项
 */
export function fileFilter(fileType: string) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    // console.log(file.mimetype) //文件的mime类型（如“image/jpeg”）
    if (!file.mimetype.includes(fileType)) {
      //上传的文件不是图片
      callback(new MethodNotAllowedException('文件格式错误！'), true) //取消上传
    } else {
      callback(null, true) //允许上传
    }
  }
}
```

如果上传分图片/文档等不同类型的上传处理，需要在控制器的不同方法定义重复度很高的代码。使用`@Upload`装饰器，可以在控制器中简化这个过程：

```ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TransformInterceptor } from '../TransformInterceptor'
import { fileFilter, Upload } from './decorator/upload.decorator'

@Controller('upload')
@UseInterceptors(new TransformInterceptor()) //请求拦截器
export class UploadController {
  // 图片上传的请求接口
  @Post('image')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     limits: { fileSize: Math.pow(1024, 2) * 2 }, //限制文件大小
  //     fileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
  //       // console.log(file.mimetype) //文件的mime类型（如“image/jpeg”）
  //       if (!file.mimetype.includes('image')) {
  //         //上传的文件不是图片
  //         callback(new MethodNotAllowedException('文件格式错误！'), true) //取消上传
  //       } else {
  //         callback(null, true) //允许上传
  //       }
  //     }, //筛选文件格式
  //   }), //拦截image接口
  // )
  @Upload('file', {
    fileFilter: fileFilter('image'), //只允许上传图片
    limits: { fileSize: Math.pow(1024, 2) * 2 }, //限制文件大小
  }) //自定义装饰器简化上传拦截
  image(@UploadedFile() file: Express.Multer.File) {
    return file //拦截后返回响应数据
  }
}
```

## 整合封装

自定义图片/文档上传的装饰器，根据不同类型单独控制上传拦截选项：

```ts
import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

/**
 * 封装拦截选项
 * @param fileType string 允许上传的文件类型
 * @returns options MulterOptions 拦截选项
 */
export function fileFilter(fileType: string) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    console.log(file.mimetype) //文件的mime类型（如“image/jpeg”）
    if (!file.mimetype.includes(fileType)) {
      //文件格式不是fileType
      callback(new MethodNotAllowedException('文件格式错误！'), false) //取消上传
    } else {
      callback(null, true) //允许上传
    }
  }
}

/**
 * 用于拦截上传文件的装饰器 => 根据不同的文件格式，自定义拦截选项
 * @params fileType string 文件格式，默认为'file'
 * @params options 拦截选项
 */
export function Upload(fileType = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(fileType, options)))
}

/**
 * 拦截图片上传的装饰器
 */
export function ImageUpload(fileType = 'file') {
  return Upload(fileType, {
    fileFilter: fileFilter('image'), //只允许上传图片
    limits: { fileSize: Math.pow(1024, 2) * 2 }, //限制文件大小
  })
}

/**
 * 拦截文档上传的装饰器
 */
export function DocumentUpload(fileType = 'file') {
  return Upload(fileType, {
    fileFilter: fileFilter('text'), //只允许上传文档
    limits: { fileSize: Math.pow(1024, 2) * 3 }, //限制文件大小
  })
}
```

文档/图片上传使用单独的接口：

```ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TransformInterceptor } from '../TransformInterceptor'
import { DocumentUpload, ImageUpload } from './decorator/upload.decorator'

@Controller('upload')
@UseInterceptors(new TransformInterceptor()) //请求拦截器
export class UploadController {
  // 图片上传的请求接口
  @Post('image')
  @ImageUpload() //自定义图片上传的拦截器
  image(@UploadedFile() file: Express.Multer.File) {
    return file //拦截后返回响应数据
  }

  // 文档上传的请求接口
  @Post('document')
  @DocumentUpload() //自定义文档上传的拦截器
  document(@UploadedFile() file: Express.Multer.File) {
    return file //拦截后返回响应数据
  }
}
```

## 通过 URL 访问静态资源

在项目入口文件`src/main.ts`中进行配置：

```ts
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
  // const app = await NestFactory.create(AppModule)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', { prefix: '/uploads' }) //上传文件后，根据url访问静态资源（http://localhost:3000/uploads/...）

  await app.listen(3000)
}
bootstrap()
```

## 编码风格

- `.prettierrc`

```json
{
  "arrowParens": "always",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 120,
  "proseWrap": "never",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "singleAttributePerLine": false,
  "endOfLine": "auto"
}
```

## 运行项目

```cmd
$ pnpm dev
```

## License

Nest is [MIT licensed](LICENSE).

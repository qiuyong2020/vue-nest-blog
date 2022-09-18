# `pipe` 管道与验证

## Description

- 什么是**管道**？（“转换数据”与“表单验证”）
- 初始化`prisma`
- `query`查询与数据类型转换
- 实现一个`query`参数转换数值的`ParseIntPipe`管道
- 管道定义方式（全局注册/模块注册）
- 使用管道实现**表单验证**
- 使用`DTO`进行验证
- 自定义验证错误消息
- 使用系统验证管道
- 使用**过滤器**处理验证异常
- 自定义表单密码比对的**验证规则**
- 使用**装饰器**实现用户唯一验证

## Installation

```bash
# 创建nest.js项目
$ nest new pipe

# 全局依赖
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express
# 开发时依赖
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer
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

## 初始化`prisma`

> 详见 `prisma` 项目

```cmd
$ pnpm prisma init

$ pnpm prisma migrate dev
```

## 创建管道

```cmd
$ nest g pi ParseIntPipe --no-spec -d
$ nest g pi ParseIntPipe --no-spec
```

`src/ParseIntPipe.pipe`

```ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // throw new BadRequestException('参数错误') //管道异常时，抛出错误

    // console.log(value, metadata) //metadata=>{ metatype: [Function: Number], type: 'param', data: 'id' }
    // return +value //管道拦截query参数后，字符串转数值

    return metadata.metatype == Number ? +value : value //根据id的声明类型，进行类型转换
  }
}
```

`src/app.controller.ts`

```ts
import { ParseIntPipe } from './ParseIntPipe.pipe'

//使用管道
@Get(':id') //请求query参数
  getHello(@Param('id', ParseIntPipe) id: number) {
    // return this.appService.getHello()
    // return typeof id

    //通过 prisma 查询数据库
    return this.prisma.article.findUnique({
      where: {
        // id: id, //报错：地址栏中输入的id值为String类型，而这里要求id为Number类型，查询失败
        id: +id, //query参数由字符串转整型
      },
    })
  }
```

## 使用管道实现验证

`src/transformer.pipe.ts`

```ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class TransformerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // throw new BadRequestException('参数错误') //管道异常时，抛出错误
    console.log(value, metadata)
    // console.log(metadata) //metadata=>{ metatype: [Function: Number], type: 'param', data: 'id' }
    // return +value //管道拦截query参数后，字符串转数值

    // return metadata.metatype == Number ? +value : value //根据id的声明类型，进行类型转换

    // 管道验证
    if (!value.title) {
      throw new BadRequestException('标题不能为空') //管道异常时，抛出错误
    }
    if (!value.content) {
      throw new BadRequestException('内容不能为空') //管道异常时，抛出错误
    }
    return value
  }
}
```

`src/app.controller.ts`

```ts
import { Body, Controller, DefaultValuePipe, Get, Param, Post } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { AppService } from './app.service'
import { TransformerPipe } from './transformer.pipe'

@Controller()
export class AppController {
  prisma: PrismaClient
  constructor(private readonly appService: AppService) {
    this.prisma = new PrismaClient()
  }

  @Get() //请求query参数
  getHello(@Param('id', new DefaultValuePipe(1), TransformerPipe) id: number) {
    // return this.appService.getHello()
    // return typeof id

    //通过 prisma 查询数据库
    return this.prisma.article.findUnique({
      where: {
        id: id, //报错：地址栏中输入的id值为String类型，而这里要求id为Number类型，查询失败
        // id: +id, //query参数由字符串转整型
      },
    })
  }

  @Post('store') //store路径
  add(@Body(TransformerPipe) dto: Record<string, any>) {
    return dto
  }
}
```

使用`ApiPost`工具发送`POST`请求

## 使用`DTO`进行验证

`src/app.controller.ts`

```ts
@Post('store') //store路由
add(@Body(TransformerPipe) dto: CreateArticleDto) {
  return dto
}
```

`src/dto/create.article.dto.ts`

```ts
import { IsNotEmpty, Length } from 'class-validator' //验证规则的包

/**
 * 用于创建博客文章的数据传输对象
 */
export default class CreateArticleDto {
  @IsNotEmpty({ message: '标题不能为空' }) //属性装饰器，非空检验
  @Length(10, 100, { message: '标题不能少于10个字' }) //字符长度校验
  title: string
  @IsNotEmpty({ message: '内容不能为空' })
  content: string
}

//校验规则对象
// article: {
//   title: {
//     rule: [{rule: 'notEmpty', {message: '标题不能为空'}}]
//   }
// }
```

`src/transformer.pipe.ts`

```ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class TransformerPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    //使用DTO进行验证
    const object = plainToInstance(metadata.metatype, value) //实例化DTO对象
    console.log(object)
    const errors = await validate(object) //接收到装饰器 @IsNotEmpty() 等的报错
    // console.log(errors)
    if (!errors.length) throw new BadRequestException('表单验证错误')

    return value
  }
}
```

## 自定义验证错误消息

```ts
import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class TransformerPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    //使用DTO进行验证
    const object = plainToInstance(metadata.metatype, value) //实例化DTO对象
    console.log(object)
    const errors = await validate(object) //接收到装饰器 @IsNotEmpty() 等的报错
    console.log(errors)
    //自定义验证错误消息
    if (errors.length) {
      const messages = errors.map((error) => ({
        name: error.property,
        message: Object.values(error.constraints).map((v) => v),
      }))
      console.log(messages)
      throw new HttpException(messages, HttpStatus.BAD_REQUEST)
    }

    return value
  }
}
```

## 使用过滤器处理验证异常

`src/main.ts`

```ts
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import Validate from './validate'
import { ValidateExceptionFilter } from './validate-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //使用系统验证管道
  app.useGlobalPipes(new Validate())

  //使用过滤器处理验证异常
  app.useGlobalFilters(new ValidateExceptionFilter())

  await app.listen(3000)
}
bootstrap()
```

`src/validate-exception.filter.ts`

```ts
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'

@Catch()
export class ValidateExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    if (exception instanceof BadRequestException) {
      const responseObject = exception.getResponse() as any
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: responseObject.message.map((error) => {
          const info = error.split('-')
          return { field: info[0], message: info[1] }
        }),
      })
    }

    return response
  }
}
```

`ApiPost`

```json
{
  "code": 422,
  "message": [
    {
      "field": "title",
      "message": "标题不能少于10个字"
    },
    {
      "field": "content",
      "message": "内容不能为空"
    }
  ]
}
```

## 自定义装饰器实现用户唯一验证

`src/rules/is-not-exist.rule.ts`

```ts
import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

// 表单中字段是否唯一
export function IsNotExistRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotExistRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          // console.log(value, args)
          // return false

          //prisma查询数据库中的 user 表，检查输入的用户名是否重复
          console.log(table, args)
          const prisma = new PrismaClient()
          const user = await prisma[table].findFirst({
            where: {
              [propertyName]: args.value,
            },
          })
          console.log(user, Boolean(user))
          return !Boolean(user)
        },
      },
    })
  }
}
```

`src/dto/register.dto.ts`

```ts
import { IsNotEmpty, Validate } from 'class-validator'
import { IsNotExistRule } from 'src/rules/is-not-exist.rule'
import { RegisterConfirmed } from 'src/rules/register-confirmed.rule'

/**
 * 注册用户的数据传输对象
 */
export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' }) //用户名非空检验
  @IsNotExistRule('user', { message: '用户名已存在' }) //自定义装饰器，验证用户名的唯一性
  name: string

  @IsNotEmpty({ message: '密码不能为空' }) //用户密码非空检验
  @Validate(RegisterConfirmed, { message: '确认密码输入错误！' }) //注入自定义验证规则进行密码校验
  password: string

  // @IsNotEmpty() //确认密码
  // password_confirmed: string
}
```

## 运行项目

```cmd
$ pnpm dev
```

## License

Nest is [MIT licensed](LICENSE).

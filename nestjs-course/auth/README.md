# `auth` 登录与注册

## Description

- 项目初始化
- 添加`prisma`模块
- 简单实现注册
- 简单实现登录

## 项目初始化

```bash
# 创建nest.js项目
$ nest new auth

# 生产依赖包
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express
# 开发依赖包
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer
# 生成连接MySQL数据库的初始化文件
$ pnpm prisma init
```

`prisma/schema.prisma`中建用户数据表

```prisma
// prisma连接MySQL数据库
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 用户数据表
model user {
  id       Int    @id @default(autoincrement()) @db.UnsignedInt
  name     String
  password String
}
```

修改`.env`环境变量

```env
# 本地MySQL数据库的登录信息
DATABASE_URL="mysql://root:admin123@localhost:3306/nest-blog"
```

删除`src/app.controller.ts`与`src/app.service.ts`

```cmd
# 新建auth模块
$ nest g mo auth --no-spec
# 新建auth控制器
$ nest g co auth --no-spec
# 新建auth服务
$ nest g mo auth --no-spec
```

新建`auth`的 DTO 验证文件`src/auth/dto/register.dto.ts`

```ts
import { IsNotEmpty } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  name: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
```

`src/auth/auth.controller.ts`

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  // 注册auth服务
  constructor(private readonly auth: AuthService) {}

  @Post('register') //用户注册 register 接口
  register(@Body() dto: RegisterDto) {
    return dto
  }
}
```

`ApiPost`发送请求：http://localhost:3000/auth/register，`body`体携带`{"name":"", password: ""}`，接收到数据。

## 添加`prisma`模块

开启 MySQL 数据库，通过`pnpm prisma migrate dev`命令，生成数据库迁移文件后，使用`new PrismaClient()`实例操作数据库。

`src/prisma/prisma.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {}
```

将`PrismaService`服务向外暴露，在`src/auth/auth.service.ts`中调用`prisma`服务

```ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} //注册prisma服务

  async register(dto: any) {
    // 查询数据库
    const user = await this.prisma.user.findUnique({
      where: {
        id: 1,
      },
    })
    return user
  }
}
```

在`user`表中写入一条数据，再向 http://localhost:3000/auth/register 发送请求，即可查询到。

## 实现注册

- `app.useGlobalPipes(new ValidationPipe())`全局注册验证管道
- 管道验证注册表单（详见`pipe`项目）
- `argon2`包对用户密码进行`Hash`加密
- `prisma`填充数据
- 删除返回前端的密码

`src/auth/auth.service.ts`

```ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { hash } from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} //注册prisma服务

  async register(dto: RegisterDto) {
    // 对用户密码进行Hash加密
    const password = await hash(dto.password)

    // 数据填充 => 提交注册表单后（向register接口发送post请求），将注册的一条数据写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    })

    delete user.password
    return user
  }
}
```

## 简单实现登录

- 实现`auth/login`登录接口
- 登录表单的`DTO`验证
- 注册登录服务
- 自定义登录表单的验证规则（详见`pipe`项目）
- 根据用户名查询数据库
- `verify`校对登录密码（数据库中的密码是加密的）
- 删除返回前端的密码

`src/auth/auth.controller.ts`

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  // 注册auth服务
  constructor(private readonly auth: AuthService) {}

  @Post('register') //用户注册 register 接口
  register(@Body() dto: RegisterDto) {
    // return dto

    // 调用注册服务
    return this.auth.register(dto)
  }

  @Post('login') //用户注册 login 接口
  login(@Body() dto: LoginDto) {
    // return dto

    // 调用登录服务
    return this.auth.login(dto)
  }
}
```

`src/auth/dto/login.dto.ts`

```ts
import { PartialType } from '@nestjs/mapped-types'
import { RegisterDto } from './register.dto' //类型映射

export class LoginDto extends PartialType(RegisterDto) {}
```

`src/auth/auth.service.ts`

```ts
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { hash, verify } from 'argon2'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} //注册prisma服务
  // 用户注册服务
  async register(dto: RegisterDto) {
    // 对用户密码进行Hash加密
    const password = await hash(dto.password)

    // 数据填充 => 提交表单后，将注册的一条数据写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    })

    delete user.password
    return user
  }
  // 用户登录服务
  async login(dto: LoginDto) {
    // return dto

    // 根据登录表单中的用户名，查询数据库
    const user = await this.prisma.user.findFirst({
      where: {
        name: dto.name,
      },
    })

    // 校对密码
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误！')
    }
    delete user.password //后端校对密码后，删除返回前端的密码，保证用户数据的安全性
    return user
  }
}
```

向 http://localhost:3000/auth/login 发送请求，进行登录验证。

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

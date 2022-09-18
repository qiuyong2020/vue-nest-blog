# `jwt` 身份认证

## Description

- 项目初始化
- 创建`auth`登录模块
- 注册表单验证后入库
- 获取注册`token`
- 用户登录操作
- 定义使用 `token` 进行身份验证的`JWT`策略
- 登录成功后，验证使用`jwt`
- 装饰器聚合以简化`jwt`验证操作

## 项目初始化

创建项目文件夹：

```bash
# 创建nest.js项目
$ nest new jwt

# 生产依赖包
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express
# 开发依赖包
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer
# 生成连接MySQL数据库的初始化文件
$ pnpm prisma init
```

为简化`prisma`对 MySQL 数据库的操作，向`package.json`中为`prisma`模块增加一条`seed`命令，并新建`prisma/seed.ts`文件：

```json
{
  "name": "jwt",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^9.0.0",
    "@nestjs/config": "^2.2.0",
    "@nestjs/core": "^9.0.0",
    "@nestjs/jwt": "^9.0.0",
    "@nestjs/passport": "^9.0.0",
    "@nestjs/platform-express": "^9.0.0",
    "@prisma/client": "^4.3.1",
    "argon2": "^0.29.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.13.2",
    "dayjs": "^1.11.5",
    "express": "^4.18.1",
    "lodash": "^4.17.21",
    "mockjs": "^1.1.0",
    "multer": "1.4.5-lts.1",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "prisma-binding": "^2.3.16",
    "reflect-metadata": "^0.1.13",
    "rimraf": "^3.0.2",
    "rxjs": "^7.2.0",
    "webpack": "^5.74.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^9.0.0",
    "@nestjs/mapped-types": "^1.1.0",
    "@nestjs/schematics": "^9.0.0",
    "@nestjs/testing": "^9.0.0",
    "@types/express": "^4.17.14",
    "@types/jest": "28.1.8",
    "@types/lodash": "^4.14.185",
    "@types/mockjs": "^1.0.6",
    "@types/multer": "^1.4.7",
    "@types/node": "^16.11.59",
    "@types/passport-jwt": "^3.0.6",
    "@types/passport-local": "^1.0.34",
    "@types/supertest": "^2.0.11",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "28.1.3",
    "prettier": "^2.3.2",
    "prisma": "^4.3.1",
    "source-map-support": "^0.5.20",
    "supertest": "^6.1.3",
    "ts-jest": "28.0.8",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.0.0",
    "tsconfig-paths": "4.1.0",
    "typescript": "^4.8.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}
```

修改`.env`中连接数据库的登录信息：

```
DATABASE_URL="mysql://[User_Name]:[password]@[host]:[port]/[Connection_Name]"
```

`prisma`操作数据库，生成迁移文件：

```cmd
$ pnpm prisma migrate dev
```

## `auth`登录模块

`src/auth/auth.module.ts`
`src/auth/auth.service.ts`
`src/auth/auth.controller.ts`

```cmd
$ nest g mo auth --no-spec
$ nest g s auth --no-spec
$ nest g co auth --no-spec
```

向`app.module.ts`中导入`AuthModule`模块，使用`auth`模块提供的服务。

在`src/auth/dto`目录下，管理`auth`模块中注册/登录接口的`DTO`数据类型：

```ts
import { IsNotEmpty } from 'class-validator'

export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空！' })
  name: string

  @IsNotEmpty({ message: '密码不能为空！' })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空！' })
  password_confirmed: string
}
```

创建`prisma`模块，提供数据填充服务：

```cmd
$ nest g mo prisma --no-spec
$ nest g s prisma --no-spec
$ nest g co prisma --no-spec
```

使用`prisma`操作数据库时，开启查询日志：

```ts
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super(process.env.NODE_ENV == 'development' ? { log: ['query'] } : {})
  }
}
```

新用户注册入库：

```ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import RegisterDto from './dto/register.dto'
import { hash } from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(body: RegisterDto) {
    // return body
    // prisma写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password),
      },
    })

    return user
  }

  login(body: any) {
    return body
  }
}
```

## 注册接口的`TOKEN`

注册 `JWT` 模块，用于获取注册的 `token`：

```ts
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt' //JWT模块
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), //读取配置项中的token密钥
        }
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```

注册配置项模块，动态读取环境变量：

```ts
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config' //配置项模块
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, //注册为全局模块
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## 用户登录

`/auth/login`接口：

```ts
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register') //注册接口
  register(@Body() body: RegisterDto) {
    return this.auth.register(body) //注册表单校验格式后，写入数据库
  }

  @Post('login') //登录接口
  login(@Body() body: LoginDto) {
    // return body
    return this.auth.login(body) //登录表单中的账号密码与数据库进行校对
  }
}
```

登录验证：

```ts
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // 用户注册
  async register(body: RegisterDto) {
    // return body
    //注册表单校验格式后，写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password), //对密码进行哈希加密后，填入数据库
      },
    })

    // return user
    return this.token(user) //获取token
  }

  async token({ name, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }), //使用JWT模块，根据用户数据生成签名
    }
  }

  // 用户登录
  async login(body: LoginDto) {
    // return body

    //根据登录表单中的用户名，查询数据库
    const user = await this.prisma.user.findUnique({
      where: {
        name: body.name,
      },
    })
    //数据库中存在用户名，继续校对密码
    if (!(await verify(user.password, body.password))) {
      throw new BadRequestException('密码输入错误！')
    }

    //账号与密码都核对无误，根据用户数据生成token
    return this.token(user)
  }
}
```

## `TOKEN`验证用户身份

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

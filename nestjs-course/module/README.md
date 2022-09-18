# 配置项模块的开发

## Description

- 初始化配置项模块
- 读取配置项模块
- 点语法读取配置项
- 模块间的相互调用
- 动态模块注册
- 完成动态配置项模块

## Installation

```bash
$ pnpm -v
$ pnpm install
# 全局依赖
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express
# 开发时依赖
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer
# src/下创建一个config/config.module.ts文件
$ nest g(enerate) mo(dule) config --no-spec [--flat] [-d]
# src/下创建一个config/config.service.ts文件
$ nest g(enerate) s(ervice) config --no-spec [--flat] [-d]
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

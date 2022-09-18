# `prisma` 连接数据库

## Description

- 创建`prisma`项目
- 创建每一个迁移文件
- **多表关联**模型
- 数据填充的环境配置
- 使用 `mock` 数据进行填充
- 拆分填充文件
- 通过`helper`帮助函数简化操作
- 创建文件数据填充
- 关联表填充的**异步阻塞**

## Installation

```bash
# 创建nest.js项目
$ nest new prisma

# 全局依赖
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express
# 开发时依赖
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer

# 后台连接数据库（Prisma is a modern DB toolkit to query, migrate and model your database）
$ npx prisma
# 初始化生成配置文件(prisma目录与.env文件) => Set up Prisma for your app.
$ npx prisma init

# VSCode安装prisma插件，享受代码提示
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

## 数据库建表

- `.env`文件：

```
# MySQL数据库的连接配置
DATABASE_URL="mysql://root:*password*@localhost:3306/nest-blog"
```

- `prisma/schema.prisma`文件：

```
// 数据库的版本管理仓库

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 用户数据表
model user {
  id        BigInt   @id @default(autoincrement()) @db.UnsignedBigInt
  age       Int
  email     String
  password  String
  avatar    String?
  github    String?
  gitee     String?
  juejin    String?
  waketime  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 目录
model category {
  id       BigInt    @id @default(autoincrement()) @db.UnsignedBigInt
  title    String
  articles article[] //关联article表（一对多）
}

// 博客文章
model article {
  id         BigInt   @id @default(autoincrement()) @db.UnsignedBigInt
  title      String
  content    String   @db.Text
  thumb      String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  category   category @relation(fields: [categoryId], references: [id], onDelete: Cascade) //article表的categoryId字段与category表的id字段进行关联
  categoryId BigInt   @db.UnsignedBigInt
}

```

- 安装并开启 MySQL 数据库：

```mysql
# 在`MySQL Workbench`中创建一个新连接
Connection Name: nest-blog
Hostname: 127.0.0.1
port: 3306
Username: root
password: ******
# 使用`MySQL Notifier`开启数据库服务
```

- 在`prisma/migrations`目录下生成迁移文件(数据库的版本管理库，根据修改时间变化)：

```
$ npx prisma migrate dev
```

## 多表关联

```cmd
$ npx prisma format
```

## 数据填充

- `package.json`

```json
//定义一条`npx prisma seed`指令, 执行prisma目录下的seed.ts文件
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

- `prisma/seed.ts`

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      id: 1,
      age: 18,
      email: 'sddfsafsdf',
      password: 'fddfdfdf',
      github: 'aaa',
    },
  }) //通过 prisma 向 user 表中填充数据
}
run()
```

- 执行数据填充，将数据压入数据库的对应表中

```cmd
$ npx prisma db seed
```

## `mock.js`生成测试数据

- `seed.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import { Random } from 'mockjs'
  const prisma = new PrismaClient()
  async function run() {
    await prisma.user.create({
      data: {
        id: 1,
        age: 18,
        email: Random.email(), //随机邮箱
        password: 'admin123',
        github: Random.url(), //随机地址
        avatar: Random.image(), //随机图片
      },
    })
  }
  run()
  ```

- 重新执行数据表的创建和数据填充

```cmd
$ npx prisma migrate reset
```

## 拆分填充文件

- `seed.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import { Random } from 'mockjs'
  const prisma = new PrismaClient()
  async function run() {
    for (let i = 0; i < 20; i++) {
      await prisma.user.create({
        data: {
          id: 1,
          age: 18,
          email: Random.email(),
          password: 'admin888',
          github: Random.url(),
          avatar: Random.image(),
        },
      })
    }

    for (let i = 0; i < 20; i++) {
      await prisma.category.create({
        data: {
          id: 1,
          title: Random.ctitle(),
        },
      })
    }
  }
  run()
  ```

  ```cmd
  # 数据填充
  $ npx prisma migrate reset
  ```

- 抽离填充文件

  `prisma/seed.ts`

  ```ts
  import { article } from './seeds/article'
  import { category } from './seeds/category'
  import { user } from './seeds/user'

  async function run() {
    user() //填充user表
    category() //填充category表（关联article表）
    article() //填充article表
  }
  run()
  ```

  `prisma/seeds/user.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import { Random } from 'mockjs'

  const prisma = new PrismaClient()
  // 填充 user 表
  export async function user() {
    for (let i = 0; i < 20; i++) {
      await prisma.user.create({
        data: {
          age: 18,
          email: Random.email(),
          password: 'admin888',
          github: Random.url(),
          avatar: Random.image(),
        },
      })
    }
  }
  ```

  `prisma/seeds/category.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import { Random } from 'mockjs'

  const prisma = new PrismaClient()
  // 填充 category 表
  export async function category() {
    for (let i = 0; i < 20; i++) {
      await prisma.category.create({
        data: {
          title: Random.ctitle(),
        },
      })
    }
  }
  ```

  `prisma/seeds/article.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import { Random } from 'mockjs'
  import { create } from '../helper'

  // 填充 article 表
  export async function article() {
    create(30, async (prisma: PrismaClient) => {
      await prisma.article.create({
        data: {
          title: Random.ctitle(),
          content: Random.cparagraph(10, 50),
          thumb: Random.image(),
          categoryId: 1,
        },
      })
    })
  }
  ```

  ```cmd
  # 数据填充
  $ npx prisma migrate reset
  ```

## 填充的异步阻塞

- `category`表与`article`表关联，填充时异步执行，修改一张表的同时、另一张表也在修改，导致填充失败。

- 阻塞异步的原理：

  ```ts
  async function a() {
    await new Promise((r) => {
      setTimeout(() => {
        console.log('a')
      }, 2000)
    })
  }
  function b() {
    a()
    console.log('b')
  }
  b() // b a

  async function c() {
    await a()
    console.log(c)
  }
  c() // a c
  ```

- 解决
  `prisma/seeds/article.ts`

  ```ts
  import { PrismaClient } from '@prisma/client'
  import _ from 'lodash'
  import { Random } from 'mockjs'
  import { create } from '../helper'

  // 填充 article 表
  export async function article() {
    create(30, async (prisma: PrismaClient) => {
      await prisma.article.create({
        data: {
          title: Random.ctitle(),
          content: Random.cparagraph(10, 50),
          thumb: Random.image(),
          categoryId: _.random(1, 10), //生成1~10的随机数
        },
      })
    })
  }
  ```

  `prisma/seed.ts`

  ```ts
  import { article } from './seeds/article'
  import { category } from './seeds/category'
  import { user } from './seeds/user'

  async function run() {
    user() //填充user表
    await category() //同步填充category表
    article() //填充article表
  }
  run()
  ```

  ```cmd
  # 数据填充
  $ npx prisma migrate reset
  ```

## Running the app

```bash
# 安装依赖
$ pnpm install

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

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

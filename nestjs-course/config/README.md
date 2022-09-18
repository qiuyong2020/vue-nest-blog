# `config` 配置管理

## Description

- 安装`ConfigModule`模块
- `process.env`环境变量
- 多配置文件定义
- 基于`namespace`命名空间进行配置
- 配置项类型支持

## Installation

```bash
# 创建nest.js项目
$ nest new config

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

## License

Nest is [MIT licensed](LICENSE).

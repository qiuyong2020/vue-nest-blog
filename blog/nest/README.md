## Description

This blog system is a **client-side** and **server-side** separation project.
Using `nest.js`, a progressive framework of `Node.js`, to develop the server-side of this project. It can help primary front-end developers write business logic throughout the process using `Javascript` alone.

## VSCode plugin

- `Prisma`
- `dotEnv`
- `project Manager`

## Create a `nest.js` project

```bash
$ nest -v
$ nest new project_name
```

## Dependencies

```bash
# dependencies on production
$ pnpm add prisma-binding @prisma/client mockjs @nestjs/config class-validator class-transformer argon2 @nestjs/passport passport passport-local @nestjs/jwt passport-jwt lodash multer dayjs express redis @nestjs/throttler

# dependencies on development
$ pnpm add -D prisma typescript @types/node @types/mockjs @nestjs/mapped-types @types/passport-local @types/passport-jwt @types/express @types/lodash @types/multer @types/node
```

## Connect your database

```bash
# Use the prisma package to manipulate MySQL database, and generate prisma/schema.prisma file and src/.env file.
$ pnpm prisma init

# In package.json, add an order under the “prisma” member, it will automate the prisma/seed.ts file when prisma is working.

# Modify the login information for your database in the .env file.
# DATABASE_URL="mysql://Username:password@host:port/Connection_name"

# Open the database service, create tables in schema.prisma file, then you can connect to your database through the prisma.
$ pnpm prisma migrate dev

# Writing SQL in seed.ts file, then execute data filling again.
$ pnpm prisma migrate reset
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ ppnpm dev

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

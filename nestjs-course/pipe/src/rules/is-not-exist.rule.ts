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

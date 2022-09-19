import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

//The username of the new user exist or not in the database.
/**
 * 验证表单字段的唯一性
 * @param table 数据表表名
 * @param validationOptions 校验选项
 * @returns boolean 是否重复
 */
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
          const prisma = new PrismaClient()
          const res = await prisma.user.findFirst({
            where: {
              [args.property]: value,
            },
          })

          // return value == args.object[`${args.property}_confirmed`]
          return !Boolean(res) //
        },
      },
    })
  }
}

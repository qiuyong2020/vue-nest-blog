import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

//The filed of the user exist or not in the database.
/**
 * 验证表单字段是否已经存在
 * @param table 数据表表名
 * @param validationOptions 校验选项
 * @returns boolean 是否为老用户
 */
export function IsExistRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsExistRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient()
          //Query the database by username.
          const res = await prisma.user.findFirst({
            where: {
              [args.property]: value,
            },
          })

          return Boolean(res) //The user already exists in your database.
        },
      },
    })
  }
}

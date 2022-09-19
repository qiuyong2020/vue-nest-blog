import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

/**
 * 验证两次输入是否一致
 * @param validationOptions 校验选项
 * @returns boolean 是否一致
 */
export function IsConfirmedRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsConfirmedRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return Boolean(value == args.object[`${args.property}_confirmed`])
        },
      },
    })
  }
}

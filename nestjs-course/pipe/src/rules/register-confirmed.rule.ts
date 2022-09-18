import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'RegisterConfirmed', async: false })
export class RegisterConfirmed implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    // console.log(value)
    // console.log(args)
    // return false
    return value === args.object[args.property + '_confirmed']
  }
  defaultMessage(): string {
    // console.log(args)
    return '密码比对失败'
  }
}

import { PartialType } from '@nestjs/mapped-types'
import { RegisterDto } from './register.dto' //类型映射

export default class LoginDto extends PartialType(RegisterDto) {}

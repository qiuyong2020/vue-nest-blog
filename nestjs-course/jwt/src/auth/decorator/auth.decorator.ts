import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * 装饰器聚合，简化 jwt 验证操作
 * @returns Auth装饰器
 */
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')))
}

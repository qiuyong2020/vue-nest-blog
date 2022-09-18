import { createParamDecorator, ExecutionContext } from '@nestjs/common'

/**
 * jwt身份认证通过后，返回用户数据的参数装饰器
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()

  return request.user
})

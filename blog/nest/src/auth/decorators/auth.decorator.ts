import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '../guards/role.guard'
import { Role } from '../role.enum'

/**
 * 装饰器聚合多种策略，定义角色守卫，验证jwt与角色
 * @params roles string[] 用户角色的枚举数组
 * @return applyDecorators (AuthGuard('jwt'), RoleGuard) 角色守卫
 */
export function Auth(...roles: Role[]) {
  // console.log(roles) //角色数组
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RoleGuard))
}

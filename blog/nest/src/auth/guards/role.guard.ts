import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'
import { Role } from '../role.enum'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {} //使用反射连接控制器
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //拿到jwt验证通过后、HTTP请求中携带的用户信息
    const user = context.switchToHttp().getRequest().user as user
    // console.log(user)
    //根据控制器的方法，检索保存在元数据metadata中的角色
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])
    // console.log(roles)

    //验证用户角色
    return roles.length ? roles.some((role) => user.role == role) : true
  }
}

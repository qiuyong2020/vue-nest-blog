import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'

/**
 * 一个全局拦截器
 * @params response 响应数据
 * @return object 作为响应对象中data属性值
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
        }
      }),
    )
  }
}

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
        //响应数据包含文章的分页信息时，无需包裹在data中，避免无意义的对象嵌套
        return data?.meta ? data : { data }
      }),
    )
  }
}

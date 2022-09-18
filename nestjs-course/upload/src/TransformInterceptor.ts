import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'

/**
 * 请求拦截器 => 在请求前/后，对数据进行拦截处理
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('拦截器前')
    const request = context.switchToHttp().getRequest() as Request
    const startTime = Date.now()

    //对所有响应数据以data属性进行包裹
    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now()
        //拦截请求后，打印日志
        new Logger().error(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`)
        return {
          data,
        }
      }),
    )
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class TransformerPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // throw new BadRequestException('参数错误') //管道异常时，抛出错误

    // console.log(value, metadata)
    // console.log(metadata) //metadata=>{ metatype: [Function: Number], type: 'param', data: 'id' }
    // return +value //管道拦截query参数后，字符串转数值

    // return metadata.metatype == Number ? +value : value //根据id的声明类型，进行类型转换

    //管道验证
    // if (!value.title) {
    //   throw new BadRequestException('标题不能为空') //管道异常时，抛出错误
    // }
    // if (!value.content) {
    //   throw new BadRequestException('内容不能为空') //管道异常时，抛出错误
    // }

    //使用DTO进行验证
    const object = plainToInstance(metadata.metatype, value) //实例化DTO对象
    console.log(object)
    const errors = await validate(object) //接收到装饰器 @IsNotEmpty() 等的报错
    console.log(errors)
    //自定义验证错误消息
    if (errors.length) {
      const messages = errors.map((error) => ({
        name: error.property,
        message: Object.values(error.constraints).map((v) => v),
      }))
      console.log(messages)
      throw new HttpException(messages, HttpStatus.BAD_REQUEST)
    }

    return value
  }
}

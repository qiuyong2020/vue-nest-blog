import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { TransformInterceptor } from '../TransformInterceptor'
import { DocumentUpload, ImageUpload } from './decorator/upload.decorator'

@Controller('upload')
@UseInterceptors(new TransformInterceptor()) //请求拦截器
export class UploadController {
  // 图片上传的请求接口
  @Post('image')
  @ImageUpload() //自定义图片上传的拦截器
  image(@UploadedFile() file: Express.Multer.File) {
    return file //拦截后返回响应数据
  }

  // 文档上传的请求接口
  @Post('document')
  @DocumentUpload() //自定义文档上传的拦截器
  document(@UploadedFile() file: Express.Multer.File) {
    return file //拦截后返回响应数据
  }
}

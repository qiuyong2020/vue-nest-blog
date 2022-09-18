import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

/**
 * 封装拦截选项
 * @param fileType string 允许上传的文件类型
 * @returns options MulterOptions 文件选项
 */
export function fileFilter(fileType: string) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    console.log(file.mimetype) //文件的mime类型（如“image/jpeg”）
    if (!file.mimetype.includes(fileType)) {
      //文件格式不是fileType
      callback(new MethodNotAllowedException('文件格式错误！'), false) //取消上传
    } else {
      callback(null, true) //允许上传
    }
  }
}

/**
 * 用于拦截上传文件的装饰器 => 根据不同的文件格式，自定义拦截选项
 * @params fileType string 文件格式，默认为'file'
 * @params options 拦截选项
 */
export function Upload(fileType = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(fileType, options)))
}

/**
 * 拦截图片上传的装饰器
 */
export function ImageUpload(fileType = 'file') {
  return Upload(fileType, {
    fileFilter: fileFilter('image'), //只允许上传图片
    limits: { fileSize: Math.pow(1024, 2) * 2 }, //限制文件大小
  })
}

/**
 * 拦截文档上传的装饰器
 */
export function DocumentUpload(fileType = 'file') {
  return Upload(fileType, {
    fileFilter: fileFilter('text'), //只允许上传文档
    limits: { fileSize: Math.pow(1024, 2) * 3 }, //限制文件大小
  })
}

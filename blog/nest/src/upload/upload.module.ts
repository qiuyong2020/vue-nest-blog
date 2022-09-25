import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { diskStorage } from 'multer'
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path'
import { UploadController } from './upload.controller'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: diskStorage({
            //文件储存位置
            destination: 'uploads',
            //文件名定制
            filename: (req, file, callback) => {
              const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
              callback(null, path)
            },
          }),
        }
      },
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}

import { Controller, Get } from '@nestjs/common'
import { ConfigService } from 'src/config/config.service'

@Controller('article')
export class ArticleController {
  // 体验 config 与 article 两个模块间的相互调用
  constructor(private readonly config: ConfigService) {}
  @Get()
  index() {
    return 'index article => ' + this.config.get('app.name')
  }
}

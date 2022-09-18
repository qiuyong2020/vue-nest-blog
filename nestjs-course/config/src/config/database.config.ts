import { registerAs } from '@nestjs/config'

// 基于命名空间进行配置
export default registerAs('database', () => ({
  host: '127.0.0.1', //本机域名
  port: 3306, //端口号
  password: 'admin123', //数据库登录密码
}))

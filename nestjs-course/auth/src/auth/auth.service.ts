import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { hash, verify } from 'argon2'
import LoginDto from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} //注册prisma服务
  // 用户注册服务
  async register(dto: RegisterDto) {
    // 对用户密码进行Hash加密
    const password = await hash(dto.password)

    // 数据填充 => 提交表单后，将注册的一条数据写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    })

    delete user.password
    return user
  }
  // 用户登录服务
  async login(dto: LoginDto) {
    // return dto

    // 根据登录表单中的用户名，查询数据库中是否存在
    const user = await this.prisma.user.findFirst({
      where: {
        name: dto.name,
      },
    })

    // 用户名存在，继续校对密码
    if (!(await verify(user.password, dto.password))) {
      throw new BadRequestException('密码输入错误！')
    }

    delete user.password //后端校对密码后，删除返回前端的密码，保证用户数据的安全性
    return user
  }
}

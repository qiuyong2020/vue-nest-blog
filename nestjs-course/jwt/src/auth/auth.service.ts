import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // 用户注册
  async register(body: RegisterDto) {
    // return body
    //注册表单校验格式后，写入数据库
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password), //对密码进行哈希加密后，填入数据库
      },
    })

    // return user
    return this.token(user) //获取token
  }

  // 获取token
  async token({ name, id }: user) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }), //使用JWT模块，根据用户数据生成签名
    }
  }

  // 用户登录
  async login(body: LoginDto) {
    // return body

    //根据登录表单中的用户名，查询数据库
    const user = await this.prisma.user.findUnique({
      where: {
        name: body.name,
      },
    })
    //数据库中存在用户名，继续校对密码
    if (!(await verify(user.password, body.password))) {
      throw new BadRequestException('密码输入错误！')
    }

    //账号与密码都核对无误，根据用户数据生成token
    return this.token(user)
  }

  // 查询数据库中所有用户
  async findAll() {
    return await this.prisma.user.findMany()
  }
}

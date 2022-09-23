import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { user } from '@prisma/client'
import { hash, verify } from 'argon2' //package for Encrypt
import { PrismaService } from '@/prisma/prisma.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  //注册
  async register(body: RegisterDto) {
    //Add the new user information to your database by prisma service.
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        password: await hash(body.password), //Hash and encrypt the original password.
      },
    })

    //After successful registration, returns a token of this user to client-side.
    return this.token(user)
  }

  //Generate a signature that encrypted the user's id and name by JWT.
  private async token({ id, name }: user) {
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    }
  }

  //登录
  async login(body: LoginDto) {
    //Query the database using a unique field or primary key
    const user = await this.prisma.user.findUnique({
      where: {
        name: body.name,
      },
    })

    //After confirming that the user exists, verify the password(hash) in database.
    if (!(await verify(user.password, body.password))) {
      throw new BadRequestException('Your password is wrong, please enter again!')
    }

    //Check out the account and password, and return the user's token to the client-side.
    return this.token(user)
  }
}

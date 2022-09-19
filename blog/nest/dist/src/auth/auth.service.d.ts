import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(body: RegisterDto): Promise<{
        token: string;
    }>;
    private token;
    login(body: LoginDto): Promise<{
        token: string;
    }>;
}

import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from '@/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate({ sub: id }: {
        sub: any;
    }): Promise<import("@prisma/client").user>;
}
export {};

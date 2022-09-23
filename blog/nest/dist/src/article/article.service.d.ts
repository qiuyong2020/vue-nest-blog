import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(createArticleDto: CreateArticleDto): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    findAll(page?: number): Promise<{
        meta: {
            current_path: number;
            page_row: any;
            total: number;
            total_page: number;
        };
        data: import("@prisma/client").article[];
    }>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    update(id: number, updateArticleDto: UpdateArticleDto): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
}

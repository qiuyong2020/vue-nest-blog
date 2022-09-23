import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    create(createArticleDto: CreateArticleDto): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    findAll(): Promise<{
        meta: {
            current_path: number;
            page_row: any;
            total: number;
            total_page: number;
        };
        data: import("@prisma/client").article[];
    }>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    update(id: string, updateArticleDto: UpdateArticleDto): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
}

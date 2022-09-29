import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entities';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    create(createArticleDto: CreateArticleDto): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
    findAll(args?: {}): Promise<{
        meta: {
            current_page: number;
            page_row: number;
            total: number;
            total_page: number;
        };
        data: (import("@prisma/client").article & {
            category: import("@prisma/client").category;
        })[];
    }>;
    findOne(id: string): Promise<Article>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<import("@prisma/client").article>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__articleClient<import("@prisma/client").article>;
}

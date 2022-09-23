"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ArticleService = class ArticleService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    create(createArticleDto) {
        return this.prisma.article.create({
            data: {
                title: createArticleDto.title,
                content: createArticleDto.content,
                categoryId: +createArticleDto.categoryId,
            },
        });
    }
    async findAll(page = 1) {
        const row = this.config.get('ARTICLE_PAGE_ROW');
        const articles = await this.prisma.article.findMany({
            skip: (page - 1) * row,
            take: +row,
        });
        console.log(`当前页有${articles.length}篇文章`);
        const total = await this.prisma.article.count();
        return {
            meta: {
                current_path: page,
                page_row: row,
                total,
                total_page: Math.ceil(total / row),
            },
            data: articles,
        };
    }
    findOne(id) {
        return this.prisma.article.findFirst({
            where: { id },
        });
    }
    update(id, updateArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: Object.assign(Object.assign({}, updateArticleDto), { categoryId: +updateArticleDto.categoryId }),
        });
    }
    remove(id) {
        return this.prisma.article.delete({
            where: { id },
        });
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map
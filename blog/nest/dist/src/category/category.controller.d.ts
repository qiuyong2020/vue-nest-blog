import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    findAll(): import("@prisma/client").PrismaPromise<import("@prisma/client").category[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
}

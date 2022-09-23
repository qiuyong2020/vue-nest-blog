import { PrismaService } from '@/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    findAll(): import("@prisma/client").PrismaPromise<import("@prisma/client").category[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__categoryClient<import("@prisma/client").category>;
}

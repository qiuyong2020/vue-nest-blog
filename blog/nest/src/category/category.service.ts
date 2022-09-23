import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  //添加单条栏目
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    })
  }

  //查询所有栏目
  findAll() {
    return this.prisma.category.findMany()
  }

  //查询单条栏目
  findOne(id: number) {
    return this.prisma.category.findFirst({ where: { id } })
  }

  //修改文章栏目
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    })
  }

  //删除文章栏目
  remove(id: number) {
    return this.prisma.category.delete({ where: { id } })
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const lodash_1 = __importDefault(require("lodash"));
const mockjs_1 = require("mockjs");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.user.create({
        data: {
            name: 'admin',
            password: await (0, argon2_1.hash)('admin123'),
            role: 'admin',
        },
    });
    for (let i = 0; i < 5; i++) {
        await prisma.category.create({
            data: {
                title: mockjs_1.Random.ctitle(3, 6),
            },
        });
    }
    for (let i = 0; i < 50; i++) {
        await prisma.article.create({
            data: {
                title: mockjs_1.Random.ctitle(10, 30),
                content: mockjs_1.Random.cparagraph(30, 50),
                categoryId: lodash_1.default.random(1, 5),
            },
        });
    }
}
run();
//# sourceMappingURL=seed.js.map
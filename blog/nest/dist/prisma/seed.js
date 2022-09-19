"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const mockjs_1 = require("mockjs");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.user.create({
        data: {
            name: 'admin',
            password: await (0, argon2_1.hash)('admin123'),
        },
    });
    for (let i = 0; i < 10; i++) {
        await prisma.article.create({
            data: {
                title: mockjs_1.Random.ctitle(10, 30),
                content: mockjs_1.Random.cparagraph(30, 50),
            },
        });
    }
}
run();
//# sourceMappingURL=seed.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExistRule = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
function IsExistRule(table, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsExistRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [table],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    const prisma = new client_1.PrismaClient();
                    const res = await prisma.user.findFirst({
                        where: {
                            [args.property]: value,
                        },
                    });
                    return Boolean(res);
                },
            },
        });
    };
}
exports.IsExistRule = IsExistRule;
//# sourceMappingURL=is-exist.rule.js.map
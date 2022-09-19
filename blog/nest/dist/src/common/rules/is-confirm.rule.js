"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsConfirmedRule = void 0;
const class_validator_1 = require("class-validator");
function IsConfirmedRule(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsConfirmedRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return Boolean(value == args.object[`${args.property}_confirmed`]);
                },
            },
        });
    };
}
exports.IsConfirmedRule = IsConfirmedRule;
//# sourceMappingURL=is-confirm.rule.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class Validate extends common_1.ValidationPipe {
    flattenValidationErrors(validationErrors) {
        const messages = {};
        validationErrors.forEach((error) => {
            messages[error.property] = Object.values(error.constraints)[0];
        });
        throw new common_1.HttpException({
            statusCode: 422,
            messages,
        }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.default = Validate;
//# sourceMappingURL=validate.js.map
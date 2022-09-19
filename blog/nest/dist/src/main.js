"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validate_1 = require("./common/validate");
const transform_interceptor_1 = require("./transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validate_1.default());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
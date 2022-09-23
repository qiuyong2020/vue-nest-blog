"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_article_dto_1 = require("./create-article.dto");
class UpdateArticleDto extends (0, mapped_types_1.PartialType)(create_article_dto_1.CreateArticleDto) {
}
exports.UpdateArticleDto = UpdateArticleDto;
//# sourceMappingURL=update-article.dto.js.map
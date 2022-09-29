"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const class_transformer_1 = require("class-transformer");
const dayjs_1 = __importDefault(require("dayjs"));
class Article {
    constructor(options) {
        Object.assign(this, options);
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, dayjs_1.default)(value).format('YYYY/MM/DD HH:mm:ss')),
    __metadata("design:type", String)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => (0, dayjs_1.default)(value).format('YYYY/MM/DD HH:mm:ss')),
    __metadata("design:type", String)
], Article.prototype, "updatedAt", void 0);
exports.Article = Article;
//# sourceMappingURL=article.entities.js.map
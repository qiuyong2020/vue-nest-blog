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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const is_exist_rule_1 = require("../../common/rules/is-exist.rule");
class LoginDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The user name is required!' }),
    (0, is_exist_rule_1.IsExistRule)('user', { message: 'This account does not exist!' }),
    __metadata("design:type", String)
], LoginDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'The password is required!' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.default = LoginDto;
//# sourceMappingURL=login.dto.js.map
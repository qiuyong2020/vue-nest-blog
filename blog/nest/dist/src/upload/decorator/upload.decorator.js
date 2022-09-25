"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUpload = exports.ImageUpload = exports.Upload = exports.fileFilter = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
function fileFilter(fileType) {
    return (req, file, callback) => {
        if (!file.mimetype.includes(fileType)) {
            callback(new common_1.MethodNotAllowedException('文件格式错误！'), false);
        }
        else {
            callback(null, true);
        }
    };
}
exports.fileFilter = fileFilter;
function Upload(fileType = 'file', options) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(fileType, options)));
}
exports.Upload = Upload;
function ImageUpload(fileType = 'file') {
    return Upload(fileType, {
        fileFilter: fileFilter('image'),
        limits: { fileSize: Math.pow(1024, 2) * 2 },
    });
}
exports.ImageUpload = ImageUpload;
function DocumentUpload(fileType = 'file') {
    return Upload(fileType, {
        fileFilter: fileFilter('text'),
        limits: { fileSize: Math.pow(1024, 2) * 3 },
    });
}
exports.DocumentUpload = DocumentUpload;
//# sourceMappingURL=upload.decorator.js.map
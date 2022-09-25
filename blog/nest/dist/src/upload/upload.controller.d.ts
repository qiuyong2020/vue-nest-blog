/// <reference types="multer" />
export declare class UploadController {
    image(file: Express.Multer.File): Express.Multer.File;
    document(file: Express.Multer.File): Express.Multer.File;
}

/// <reference types="multer" />
export declare class UploadController {
    image(file: Express.Multer.File): {
        url: string;
    };
    document(file: Express.Multer.File): {
        url: string;
    };
}

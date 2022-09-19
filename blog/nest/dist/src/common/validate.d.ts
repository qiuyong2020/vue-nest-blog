import { ValidationError, ValidationPipe } from '@nestjs/common';
export default class Validate extends ValidationPipe {
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[];
}

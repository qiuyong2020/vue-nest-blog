import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

/**
 * 自定义表单校验的规则对象
 * @params validationErrors 表单校验未通过的错误消息数组
 * @return exceptionArray 自定义的错误消息数组
 */
export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    //Print the error message that the form validation has failed.
    // console.log(validationErrors)

    //Custom your error message object
    const messages = {}

    //Go through the error message array
    validationErrors.forEach((error) => {
      messages[error.property] = Object.values(error.constraints)[0]
    })

    //Throw exception messages array, status code is 422.
    throw new HttpException(
      {
        statusCode: 422,
        messages,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}

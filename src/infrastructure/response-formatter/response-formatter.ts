import { HttpException } from '@nestjs/common';


export const formatErrorResponse = (error, statusCode) => {
    error = [error]
     throw new HttpException({message: error}, statusCode);
};

import { Response } from 'express';
import ApiResponse from '../types/Api.response';

export default class ResponseHandler {
  success<T>(res: Response, message: string = 'Success', code: number, data?: T) {
    const response: ApiResponse<T> = {
      success: true,
      message: message,
      result: data,
    };

    return res.status(code).json(response);
  }

  error<T>(
    res: Response,
    message: string = 'Internal Server Error, please try again after some time',
    code: number = 500
  ) {
    const response: ApiResponse<T> = {
      success: false,
      message: message,
    };

    return res.status(code).json(response);
  }
}

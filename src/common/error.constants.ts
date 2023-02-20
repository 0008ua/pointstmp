import { HttpStatus } from '@nestjs/common';

type errorConstant = [string, HttpStatus];
export const NAME_EXIST: errorConstant = [
  'Name already exist',
  HttpStatus.FORBIDDEN,
];
export const USER_NOT_FOUND: errorConstant = [
  'User not found',
  HttpStatus.FORBIDDEN,
];
export const WRONG_PASSWORD: errorConstant = [
  'Wrong password',
  HttpStatus.FORBIDDEN,
];
export const INTERNAL_SERVER_ERROR: errorConstant = [
  'Internal Server Error',
  HttpStatus.INTERNAL_SERVER_ERROR,
];

// !!!
export const DB_ERROR: errorConstant = ['DB Error', HttpStatus.BAD_REQUEST];
export const WRONG_CODE: errorConstant = ['Wrong code', HttpStatus.BAD_REQUEST];

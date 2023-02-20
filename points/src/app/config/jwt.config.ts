import { InjectionToken } from '@angular/core';
import jwtDecode from 'jwt-decode';

export const JwtDecodeFactory = () => {
  return jwtDecode;
};

export type JwtDecode = typeof jwtDecode;

export const JWT_DECODE = new InjectionToken('JWT_DECODE');

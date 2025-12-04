// app/lib/api/types.ts

/**
 * 通用错误响应
 */
export interface BadRequestResponse {
  message: string;
  status: 'error';
}

/**
 * 创建用户请求体 (POST /users)
 */
export interface CreateUserRequest {
  username: string;
  password: string;
  email?: string;
  nickname?: string;
  avatar?: string;
}

/**
 * 创建用户响应数据
 */
export interface CreateUserResponseData {
  uuid: string;
  username: string;
  createAt: string; // ISO 8601 date string
}

/**
 * 创建用户成功响应
 */
export interface CreateUserResponse {
  data: CreateUserResponseData;
  status: 'success';
}

/**
 * 登录请求体 (POST /sessions)
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponseData {
  token: string;
  expireAt: number; // Unix timestamp in milliseconds
}

/**
 * 登录成功响应
 */
export interface LoginResponse {
  data: LoginResponseData;
  status: 'success';
}

/**
 * API 响应的通用泛型类型
 * 可以是成功响应 T，也可以是错误响应
 */
export type ApiResponse<T> = T | BadRequestResponse;

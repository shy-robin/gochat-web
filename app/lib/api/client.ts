// app/lib/api/client.ts

import {
  type ApiResponse,
  type CreateUserRequest,
  type CreateUserResponse,
  type LoginRequest,
  type LoginResponse,
  type BadRequestResponse,
} from './types';

// 从环境变量或默认值获取 API 基础 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8083/api/v1';

/**
 * 基础 API 请求函数
 * @param endpoint - API 端点路径
 * @param options - fetch 请求的配置选项
 * @returns 返回解析后的 JSON 数据
 * @throws 当网络请求失败时抛出错误
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      // 如果服务器返回错误状态码，将其作为 BadRequestResponse 类型处理
      return data as BadRequestResponse;
    }

    return data as T;
  } catch (error) {
    console.error('API fetch error:', error);
    // 网络或其他 fetch 错误
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'An unknown network error occurred',
    };
  }
}

/**
 * 注册新用户
 * @param userData - 创建用户所需的数据
 * @returns 返回创建用户的 API 响应
 */
export const createUser = (userData: CreateUserRequest): Promise<ApiResponse<CreateUserResponse>> => {
  return apiFetch<CreateUserResponse>('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * 用户登录
 * @param credentials - 用户登录凭据
 * @returns 返回登录的 API 响应
 */
export const login = (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return apiFetch<LoginResponse>('/sessions', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

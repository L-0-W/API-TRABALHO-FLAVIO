export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: Array<T>;
  total: number;
  statusCode: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  senha: string;
  idade: number;
  role: string;
}

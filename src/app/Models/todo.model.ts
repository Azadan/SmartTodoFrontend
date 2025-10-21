export interface Todo {
  userId: number;
  todoId: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface CreateTodoRequest {
  userId?: number;
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

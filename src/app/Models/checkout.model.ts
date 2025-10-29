export interface CheckoutData {
  url?: string;
  id?: string;
}

export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

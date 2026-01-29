export interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  authDate: number;
  hash: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

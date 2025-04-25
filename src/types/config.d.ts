export type Cafe24Config = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  REDIRECT_URI: string;
  SCOPE: string;
  CSRF_SECRET: string;
};

export type Cafe24ConfigResult = {
  success: boolean;
  config?: Cafe24Config;
  error?: string;
  issues?: Array<{ path: string; message: string }>;
};

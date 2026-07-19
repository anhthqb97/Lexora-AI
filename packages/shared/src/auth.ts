export type RegisterInput = {
  email: string;
  password: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
};

export type MobileTokenRequest = {
  email: string;
  password: string;
};

export type MobileTokenResponse = AuthTokens & {
  tokenType: "Bearer";
};

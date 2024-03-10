export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
  }
  }
}

interface UserInfo {
  id: string;
  name: string;
  stid: number;
  isstudent: boolean;
}
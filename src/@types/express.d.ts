declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: 'ADM' | 'OWNER' | 'USER';
    };
  }
}

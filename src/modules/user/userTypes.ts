
export interface IUserCreate {
    email: string;
    password: string;
    username: string;
  }
  
  export interface IUserResponse {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
  }
  
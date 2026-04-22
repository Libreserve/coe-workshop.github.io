export interface User {
  tel: string;
  profileUrl: string;
  username: string;
  email: string;
}

export interface AdminUser {
  phone: string;
  profileUrl: string;
  userName: string;
}

export enum UserRole {
  RESERVER = "RESERVER",
  ADMIN = "ADMIN",
}

import { UserRole } from "./UserRole";

export class SystemUser {
  id: string;
  email: string;
  status: boolean;
  password: string;
  last_updated_on: Date = null;
  last_logged_on: Date = null;
  role: UserRole[] = new Array<UserRole>();
}

interface Credential {
  type: string;
  value: string;
  temporary: boolean;
}

export class CreateUserDto {
  username: string;
  firstName: string;
  lastName: string;
  credentials: Credential[];
}

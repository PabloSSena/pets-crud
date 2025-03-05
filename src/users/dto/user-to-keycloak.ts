export class Credentials {
  type: string;
  value: string;
  temporary: boolean;
}

export class UserKeycloakDTO {
  username: string;
  email: string;
  enabled: boolean = true;
  credentials: Credentials[];
}

import { IsNotEmpty } from 'class-validator'

export class CreateUser {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  password: string
}

export class UpdateUser {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  password: string
  
  token: string

  @IsNotEmpty()
  code_pk: string
}

export class FindOneUser {
  @IsNotEmpty()
  login: string
}

export class DeleteUser {
  @IsNotEmpty()
  code_pk: string
}

export class AuthUserRequest {
  @IsNotEmpty()
  login: string

  @IsNotEmpty()
  password: string
}

export class AuthTokenUser {
  @IsNotEmpty()
  token: string
}

export class AuthUser {
  login: string
  name: string
  code_pk: string
}

export class UserCreated {
  login: string
  name: string
  token: string
  code_pk: string
}

export class UserUpdated {
  login: string
  name: string
  token: string
  code_pk: string
}

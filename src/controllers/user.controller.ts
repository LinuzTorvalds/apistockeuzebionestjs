import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { CreateUserService } from 'src/services/user/create.service'
import {
  AuthTokenUser,
  CreateUser,
  DeleteUser,
  FindOneUser,
  UpdateUser,
  AuthUserRequest,
  UserCreated,
  UserUpdated,
} from 'src/types/user'
import { AuthUserService } from '../services/user/auth.service'
import { AuthTokenUserService } from '../services/user/auth-token.service'
import { DeleteUserService } from 'src/services/user/delete.service'
import { FindOneUserService } from 'src/services/user/find-one.service'
import { RetrieveUserService } from 'src/services/user/retrieve.service'
import { UpdateUserService } from '../services/user/update.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly authTokenUserService: AuthTokenUserService,
    private readonly createUserService: CreateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly findOneUserService: FindOneUserService,
    private readonly retrieveUserService: RetrieveUserService,
    private readonly updateUserService: UpdateUserService
  ) {}

  @Get('/')
  homeUsers(): string {
    return 'Home users'
  }

  @Post('auth')
  async authUser(@Body() user: AuthUserRequest) {
    return this.authUserService.auth(user)
  }

  @Post('authToken')
  async authTokenUser(@Body() user: AuthTokenUser) {
    return this.authTokenUserService.authToken(user)
  }

  @Post('create')
  async createUser(@Body() user: CreateUser): Promise<UserCreated> {
    return this.createUserService.create(user)
  }

  @Delete('delete')
  async deleteUser(@Body() user: DeleteUser) {
    return this.deleteUserService.delete(user)
  }

  @Get('findOne')
  async findOneUser(@Body() user: FindOneUser) {
    return this.findOneUserService.findOne(user)
  }

  @Get('retrieve')
  async retrieveAllUsers() {
    return this.retrieveUserService.retrieve()
  }

  @Put('update')
  async updateUser(@Body() user: UpdateUser): Promise<UserUpdated> {
    return this.updateUserService.update(user)
  }
}

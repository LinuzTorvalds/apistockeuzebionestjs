import { Module } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UserController } from 'src/controllers/user.controller'
import { AuthTokenUserService } from 'src/services/user/auth-token.service'
import { AuthUserService } from 'src/services/user/auth.service'
import { CreateUserService } from 'src/services/user/create.service'
import { DeleteUserService } from 'src/services/user/delete.service'
import { FindOneUserService } from 'src/services/user/find-one.service'
import { RetrieveUserService } from 'src/services/user/retrieve.service'
import { UpdateUserService } from 'src/services/user/update.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    AuthUserService,
    AuthTokenUserService,
    CreateUserService,
    DeleteUserService,
    FindOneUserService,
    RetrieveUserService,
    UpdateUserService,
  ],
})
export class UserModule {}

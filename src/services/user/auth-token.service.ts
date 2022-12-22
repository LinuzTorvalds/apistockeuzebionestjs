import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AuthTokenUser, AuthUser } from 'src/types/user'

@Injectable()
export class AuthTokenUserService {
  constructor(private readonly prisma: PrismaService) {}

  async authToken(user: AuthTokenUser) {
    const userFind = await this.prisma.user
      .findFirst({
        where: {
          token: user.token,
        },
      })
      .finally(async () => await this.prisma.$disconnect())

    if (userFind) {
      const authUser: AuthUser = {
        login: userFind.login,
        name: userFind.name,
        code_pk: userFind.code_pk,
      }
      return authUser
    } else return 'Your token is invalid'
  }
}

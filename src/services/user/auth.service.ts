import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AuthUser, AuthUserRequest } from 'src/types/user'
import { compare } from 'bcryptjs'

@Injectable()
export class AuthUserService {
  constructor(private readonly prisma: PrismaService) {}

  async auth(user: AuthUserRequest): Promise<AuthUser | string> {
    const userFind = await this.prisma.user.findFirst({
      where: {
        login: user.login
      }
    }).finally(async () => await this.prisma.$disconnect())

    if (userFind) {
      if (await compare(user.password, userFind.password)) {
        const authUser: AuthUser = {
          login: userFind.login,
          name: userFind.name,
          code_pk: userFind.code_pk,
        }
        return authUser
      }
      else return 'User or password incorrect'
    }
    else return 'User or password incorrect'
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { FindOneUser } from 'src/types/user'

@Injectable()
export class FindOneUserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(user: FindOneUser) {
    const userFind = await this.prisma.user
      .findFirst({
        where: {
          login: user.login,
        },
      })
      .finally(async () => await this.prisma.$disconnect())

    if (userFind) return userFind
    else 'No user found'
  }
}

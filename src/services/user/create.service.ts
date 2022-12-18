import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { CreateUser, UserCreated } from 'src/types/user'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

@Injectable()
export class CreateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUser): Promise<UserCreated> {
    const passwordHashed = await hash(user.password, 12)
    const response = await this.prisma.user
      .create({
        data: {
          name: user.name,
          login: user.login,
          password: passwordHashed,
          token: randomUUID(),
          code_pk: randomUUID(),
        },
      }).finally(async () => await this.prisma.$disconnect())

      const userCreate: UserCreated = {
        login: response.login,
        name: response.name,
        token: response.token,
        code_pk: response.code_pk,
      }
      
      return userCreate
  }
}

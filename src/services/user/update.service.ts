import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UpdateUser, UserUpdated } from 'src/types/user'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}

  async update(user: UpdateUser): Promise<UserUpdated> {
    const userFind = await this.prisma.user.findFirst({
      where: {
        code_pk: user.code_pk,
      },
    })
    let passwordHashed: string
    if (user.password === userFind.password) passwordHashed = user.password
    else passwordHashed = await hash(user.password, 12)
    const response = await this.prisma.user
      .update({
        data: {
          name: user.name,
          login: user.login,
          password: passwordHashed,
          token: randomUUID(),
        },
        where: { code_pk: user.code_pk },
      })
      .finally(async () => await this.prisma.$disconnect())

    const userUpdate: UserUpdated = {
      login: response.login,
      name: response.name,
      token: response.token,
      code_pk: response.code_pk,
    }

    return userUpdate
  }
}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { DeleteUser } from 'src/types/user'

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async delete(user: DeleteUser) {
    const response = await this.prisma.user.delete({
      where: {
        code_pk: user.code_pk
      }
    }).finally(async () => await this.prisma.$disconnect())

    return response
  }
}

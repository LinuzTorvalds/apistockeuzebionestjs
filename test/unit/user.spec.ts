
import { describe, it, expect } from 'vitest'
import { randomUUID } from 'node:crypto'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserService } from 'src/services/user/create.service'
import { RetrieveUserService } from 'src/services/user/retrieve.service'
import { FindOneUserService } from 'src/services/user/find-one.service'
import { AuthUserRequest, FindOneUser, UpdateUser, AuthTokenUser, DeleteUser, AuthUser } from 'src/types/user'
import { UpdateUserService } from 'src/services/user/update.service'
import { AuthUserService } from 'src/services/user/auth.service'
import { AuthTokenUserService } from 'src/services/user/auth-token.service'
import { DeleteUserService } from 'src/services/user/delete.service'

const prisma = new PrismaService()

describe('User service test switch', () => {
  it(' should create a new user if not exists', async () => {
    const createUserService = new CreateUserService(prisma)
    const user = {
      code_pk: randomUUID(),
      name: 'John Doe',
      login: 'service',
      password: 'password',
      token: randomUUID(),
    }
    const response =  await createUserService.create(user)
    expect(response).toHaveProperty('code_pk')
  })

  it(' should retrive an existing user', async () => {
    const retrieveUserService = new RetrieveUserService(prisma)
    const response = await retrieveUserService.retrieve()
    expect(response.length).toBeGreaterThan(0)
  })

  it(' should find one an existing user', async () => {
    const findOneUserService = new FindOneUserService(prisma)
    const user: FindOneUser = {
      login: 'service',
    }
    const response = await findOneUserService.findOne(user)
    expect(response).toHaveProperty('code_pk')
  })

  it(' should update an existing user', async () => {
    const updateUserService = new UpdateUserService(prisma)
    const findOneUserService = new FindOneUserService(prisma)
    const user: FindOneUser = {
      login: 'service',
    }
    const existingUser = await findOneUserService.findOne(user)
    const updateUser: UpdateUser = {
      code_pk: existingUser.code_pk,
      login: existingUser.login,
      name: 'John Doe update',
      token: existingUser.token,
      password: existingUser.password
    }
    const response = await updateUserService.update(updateUser)
    expect(response).property('name').equals('John Doe update')
  })

  it(' should retrieve the auth info if login and password is correct', async () => {
    const authUserService = new AuthUserService(prisma)
    const user: AuthUserRequest = { 
      login: 'service',
      password: 'password',
    }
    const response: AuthUser | string = await authUserService.auth(user)
    expect(response).toHaveProperty('code_pk')
  })

  it(' should retrieve user not found if login is incorrect', async () => {
    const authUserService = new AuthUserService(prisma)
    const user: AuthUserRequest = { 
      login: 'services',
      password: 'password',
    }
    const response = await authUserService.auth(user)
    expect(response).toBe('User or password incorrect')
  })

  it(' should retrieve password incorrect if password is incorrect', async () => {
    const authUserService = new AuthUserService(prisma)
    const user: AuthUserRequest = { 
      login: 'services',
      password: 'incorrect',
    }
    const response = await authUserService.auth(user)
    expect(response).toBe('User or password incorrect')
  })

  it(' should retrieve the auth info if token is valid', async () => {
    const authToken = new AuthTokenUserService(prisma)
    const findOneUserService = new FindOneUserService(prisma)
    const user: FindOneUser = {
      login: 'service',
    }
    const existingUser = await findOneUserService.findOne(user)
    const authTokenUser: AuthTokenUser = { 
      token: existingUser.token
    }
    const response = await authToken.authToken(authTokenUser)
    expect(response).toHaveProperty('code_pk')
  })

  it(' should retrieve Your token is invalid if token is invalid', async () => {
    const authToken = new AuthTokenUserService(prisma)
    const user: AuthTokenUser = { 
      token: 'token'
    }
    const response = await authToken.authToken(user)
    expect(response).toBe('Your token is invalid')
  })

  it(' should delete an exisiting user', async () => {
    const userfind: FindOneUser =  { 
      login: 'service'
    }
    const deleteUserService = new DeleteUserService(prisma)
    const findOneUserService = new FindOneUserService(prisma)
    const existingUser = await findOneUserService.findOne(userfind)
    const deleteUser: DeleteUser = {
      code_pk: existingUser.code_pk
    }
    const response = await deleteUserService.delete(deleteUser)
    expect(response).toHaveProperty('code_pk')
  })
})
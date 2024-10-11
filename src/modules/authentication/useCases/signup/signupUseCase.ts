import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { prisma } from '@database/prismaClient'

interface IRequest {
  email: string
  username: string
  password: string
}

export class SignupUseCase {
  async execute({ email, password, username }: IRequest) {
    try {
      const accountExist = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (accountExist) {
        throw new Error('Esta conta já existe')
      }

      const emailExist = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (emailExist) {
        throw new Error('Username already exists')
      }

      try {
        const user = await prisma.user.create({
          data: {
            email,
            username,
            password,
          },
        })

        return { username, email, userId: user.id }
      } catch (createError) {
        if (
          createError instanceof
            PrismaClientKnownRequestError &&
          createError.code === 'P2002'
        ) {
          throw new Error('Unique constraint failed')
        }
        console.error(createError)
        throw new Error('Failed to create user')
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

import { prisma } from '@database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

export class SigninUseCase {
  async execute({ email, password }: IRequest) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          username: true,
          password: true,
        },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const passwordMatch = await compare(
        password,
        user.password,
      )

      if (!passwordMatch) {
        throw new Error('Invalid email or password')
      }

      const token = sign(
        {
          email,
        },
        '96C8CAB499686EA0F71683E53873550CA939422CBC61D3644BC3BAFAB3D53DB3',
        {
          subject: user.id,
          expiresIn: '14d', // for test
        },
      )

      return {
        username: user.username,
        token,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

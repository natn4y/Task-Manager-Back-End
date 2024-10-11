import { prisma } from '@database/prismaClient'

interface IRequest {
  user: string
  title: string
  status: string
  description: string
}

export class CreateTaskUseCase {
  async execute({
    user,
    title,
    status,
    description,
  }: IRequest) {
    const tasks = await prisma.task.create({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      data: {
        title,
        status,
        description,
        userId: user,
      },
    })
    return {
      id: tasks.id,
      title: tasks.title,
      status: tasks.status,
      description: tasks.description,
      user: tasks.user.username,
    }
  }
}

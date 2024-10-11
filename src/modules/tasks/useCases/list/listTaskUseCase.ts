import { prisma } from '@database/prismaClient'

interface IRequest {
  title: string
  status: string
  user: string
}

export class ListTaskUseCase {
  async execute({ user, title, status }: IRequest) {
    let whereClause = {} as any

    if (title) {
      whereClause.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    if (status) {
      whereClause.status = status
    }

    if (user) {
      whereClause.user = {
        username: {
          contains: user,
          mode: 'insensitive',
        },
      }
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc', // Ordena por data de criação, do mais recente para o mais antigo
      },
    })

    return tasks.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      user: t.user.username,
    }))
  }
}

import { prisma } from '@database/prismaClient'

interface IRequest {
  id: string
  title: string
  status: string
  description: string
}

export class EditTaskUseCase {
  async execute({
    id,
    title,
    status,
    description,
  }: IRequest) {
    const existingTask = await prisma.task.findUnique({
      where: { id },
    })

    if (!existingTask) {
      return { error: 'Task not found' }
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      data: {
        title: title || existingTask.title,
        description:
          description || existingTask.description,
        status: status || existingTask.status,
      },
    })

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      user: updatedTask.user.username,
    }
  }
}

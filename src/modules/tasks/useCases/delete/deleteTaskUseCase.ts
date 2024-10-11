import { prisma } from '@database/prismaClient'

interface IRequest {
  id: string
}

export class DeleteTaskUseCase {
  async execute({ id }: IRequest) {
    await prisma.task.delete({
      where: {
        id,
      },
    })
    return 'Task deletada com sucesso!'
  }
}

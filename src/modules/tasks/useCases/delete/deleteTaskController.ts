import { Request, Response } from 'express'
import { DeleteTaskUseCase } from './deleteTaskUseCase'

export class DeleteTaskController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const deleteTaskUseCase = new DeleteTaskUseCase()

    try {
      const result = await deleteTaskUseCase.execute({
        id,
      })
      response.status(200).json(result)
    } catch (error: any) {
      console.error('Failed to delete task', error)
      response
        .status(500)
        .json({ error: 'Failed to delete task' })
    }
  }
}

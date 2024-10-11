import { Request, Response } from 'express'
import { EditTaskUseCase } from './editTaskUseCase'

export class EditTaskController {
  async handle(request: Request, response: Response) {
    const editTaskUseCase = new EditTaskUseCase()
    const { id } = request.params
    const { title, status, description } = request.body

    try {
      const result = await editTaskUseCase.execute({
        id,
        title,
        status,
        description,
      })
      response.status(200).json(result)
    } catch (error: any) {
      console.error('Failed to edit task', error)
      response
        .status(500)
        .json({ error: 'Failed to edit task' })
    }
  }
}

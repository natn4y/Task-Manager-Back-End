import { Request, Response } from 'express'
import { CreateTaskUseCase } from './createTaskUseCase'

export class CreateTaskController {
  async handle(request: Request, response: Response) {
    const createTaskUseCase = new CreateTaskUseCase()

    const user = request.user
    const { title, status, description } = request.body

    try {
      const result = await createTaskUseCase.execute({
        user,
        title,
        status,
        description,
      })
      response.status(200).json(result)
    } catch (error: any) {
      console.error('Failed to create task', error)
      response
        .status(500)
        .json({ error: 'Failed to create task' })
    }
  }
}

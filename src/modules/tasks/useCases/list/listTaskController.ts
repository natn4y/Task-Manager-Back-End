import { Request, Response } from 'express'
import { ListTaskUseCase } from './listTaskUseCase'

export class ListTaskController {
  async handle(request: Request, response: Response) {
    const listTaskUseCase = new ListTaskUseCase()

    const { title, status, user } = request.body

    try {
      const result = await listTaskUseCase.execute({
        title,
        status,
        user,
      })
      response.status(200).json(result)
    } catch (error: any) {
      console.error('Error fetching tasks:', error)
      response
        .status(500)
        .json({ error: 'Failed to fetch tasks' })
    }
  }
}

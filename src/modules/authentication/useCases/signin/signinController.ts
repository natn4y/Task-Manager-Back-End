import { Request, Response } from 'express'
import { SigninUseCase } from './signinUseCase'

export class SigninController {
  async handle(request: Request, response: Response) {
    const signinUseCase = new SigninUseCase()

    const { email, password } = request.body

    try {
      const result = await signinUseCase.execute({
        email,
        password,
      })
      response.status(200).json(result)
    } catch (error: any) {
      if (
        error.message === 'User not found' ||
        error.message === 'Invalid email or password'
      ) {
        response
          .status(401)
          .json({ message: 'Invalid email or password' })
      } else {
        console.error(error)
        response
          .status(500)
          .json({ message: 'Internal server error' })
      }
    }
  }
}

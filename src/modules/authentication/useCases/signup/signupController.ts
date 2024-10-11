import { Request, Response } from 'express'
import { SignupUseCase } from './signupUseCase'
import bcrypt from 'bcrypt'

export class SignupController {
  async handle(request: Request, response: Response) {
    const signupUseCase = new SignupUseCase()

    try {
      const { username, email, password } = request.body

      const hashedPassword = await bcrypt.hash(password, 10)

      await signupUseCase.execute({
        username,
        email,
        password: hashedPassword,
      })

      response.status(200).json({
        message: 'Cadastrado com sucesso!',
      })
    } catch (error: any) {
      if (error.message === 'Esta conta já existe') {
        response
          .status(409)
          .json({ message: 'Esta conta já existe' })
      } else {
        console.error(error)
        response
          .status(500)
          .json({ message: 'Internal server error' })
      }
    }
  }
}

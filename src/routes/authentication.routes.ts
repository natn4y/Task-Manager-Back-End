import { Router } from 'express'

import { SigninController } from '@modules/authentication/useCases/signin/signinController'
import { SignupController } from '@modules/authentication/useCases/signup/signupController'

const AuthenticateRoutes = Router()

const signupController = new SignupController()
const signinController = new SigninController()

AuthenticateRoutes.post('/signup', signupController.handle)
AuthenticateRoutes.post('/signin', signinController.handle)

export default AuthenticateRoutes

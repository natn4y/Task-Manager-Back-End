import { register } from 'tsconfig-paths'
import * as path from 'path'
import express from 'express'
import morgan from 'morgan'
import os from 'os'
import cors from 'cors'

register({
  baseUrl: path.resolve(__dirname, '..'),
  paths: {
    '@database/*': ['src/database/*'],
    '@middlewares/*': ['src/middlewares/*'],
    '@modules/*': ['src/modules/*'],
    '@routes/*': ['src/routes/*'],
    '@services/*': ['src/services/*'],
  },
})

import AuthenticateRoutes from '@routes/authentication.routes'
import TaskRoutes from '@routes/task.routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/authenticate', AuthenticateRoutes)
app.use('/task', TaskRoutes)

const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const ipAddress = getLocalIpAddress()
app.listen(8000, () => {
  console.log(
    `\n__ ALERT ~/ \n\nServer is running at \n http://${ipAddress}:8000/ <----  \n`,
  )
})

import { Router } from 'express'

import { CreateTaskController } from '@modules/tasks/useCases/create/createTaskController'
import { DeleteTaskController } from '@modules/tasks/useCases/delete/deleteTaskController'
import { EditTaskController } from '@modules/tasks/useCases/edit/editTaskController'
import { ListTaskController } from '@modules/tasks/useCases/list/listTaskController'

import { authMiddleware } from '@middlewares/authMiddleWare'

const TaskRoutes = Router()

const listTaskController = new ListTaskController()
const createTaskController = new CreateTaskController()
const editTaskController = new EditTaskController()
const deleteTaskController = new DeleteTaskController()

TaskRoutes.post('/list', listTaskController.handle)

TaskRoutes.post(
  '/create',
  authMiddleware,
  createTaskController.handle,
)

TaskRoutes.put(
  '/edit/:id',
  authMiddleware,
  editTaskController.handle,
)

TaskRoutes.delete(
  '/delete/:id',
  authMiddleware,
  deleteTaskController.handle,
)

export default TaskRoutes

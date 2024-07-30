/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'
import ClassRoom from '#models/classRoom'
import RoomsController from '#controllers/rooms_controller'


router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])

  router.get('showclasses',[UsersController, 'showClasses']).use(middleware.auth())
  router.get('show/:id',[UsersController, 'show']).use(middleware.auth())
  router.patch('update/:id',[UsersController, 'update']).use(middleware.auth())
  router.delete('delete/:id', [UsersController, 'destroy']).use(middleware.auth())
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  
}).prefix('user')

router.group(() => {
  router.post('create', [RoomsController, 'store']).use(middleware.auth())
  router.post('assignuser', [RoomsController, 'assignUser']).use(middleware.auth())
  router.delete('unassignuser', [RoomsController, 'unAssignUser']).use(middleware.auth())
  router.get('show/:id', [RoomsController, 'show']).use(middleware.auth())
  router.patch('update/:id', [RoomsController, 'update']).use(middleware.auth())
  router.delete('delete/:id', [RoomsController, 'destroy']).use(middleware.auth())
}).prefix('classroom')

router.get('me', async ({auth, response}) => {
  try {
    const user = auth.getUserOrFail();
    return response.ok(user)
    
  } catch (error) {
    return response.unauthorized({error})
  }
}).use(middleware.auth())

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

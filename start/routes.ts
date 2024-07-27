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


router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])

  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
}).prefix('user')

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

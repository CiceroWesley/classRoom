import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async update({params, request, response, auth}: HttpContext){
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            console.log(user)
            if(user && user.type === 0){
                const body = request.all();
                // console.log('entrou2')
                // update user by id
                const user = await User.findOrFail(params.id)
                console.log(user)
                user.fullName = body.fullName
                user.email = body.email
                user.registration = body.registration
                user.date_of_birth = body.date_of_birth

                user.save()

                // return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }
}
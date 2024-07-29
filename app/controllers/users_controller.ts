import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    async show({request, response, auth}: HttpContext){
        const id = request.param('id')
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                
                // get user by id
                const user = await User.findOrFail(id)

                return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    



    async update({request, response, auth}: HttpContext){
        const id = request.param('id')
        
        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                const body = request.all();
                
                // update user by id
                const user = await User.findOrFail(id)
                user.fullName = body.fullName
                user.email = body.email
                user.registration = body.registration
                user.date_of_birth = body.date_of_birth

                await user.save()

                return response.ok(user)
                
            } else {
                throw('Level of unauthorized access')
            }
            
          } catch (error) {
            return response.unauthorized({error})
          }
    }

    async destroy({request, response, auth}: HttpContext){
        const id = request.param('id')

        try {
            // verify if is adm and authorized
            const user = auth.getUserOrFail();
            if(user && user.type === 0){
                const user = await User.findOrFail(id)
                await user.delete()
                return response.ok(user);


            } else {
                throw('Level of unauthorized access')
            }
            
        } catch (error) {
            return response.unauthorized(error)
        }
    }
}